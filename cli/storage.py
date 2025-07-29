"""
File storage management for scrapbook entries.
"""

import json
import yaml
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
try:
    from .models import ScrapEntry, EntryType
    from .config import Config
except ImportError:
    from models import ScrapEntry, EntryType
    from config import Config


class StorageManager:
    """Manages file storage for scrapbook entries."""
    
    def __init__(self, config: Config):
        """Initialize storage manager."""
        self.config = config
        self.data_dir = config.get_data_dir()
        self.scrap_dir = self.data_dir / '.scrap'
        self.index_file = self.scrap_dir / 'index.json'
        self.counters_file = self.scrap_dir / 'counters.json'
        
        # Create directory structure
        self._init_directories()
        self._load_counters()
    
    def _init_directories(self) -> None:
        """Initialize directory structure."""
        # Main data directories
        (self.data_dir / 'ideas').mkdir(parents=True, exist_ok=True)
        (self.data_dir / 'prompts').mkdir(parents=True, exist_ok=True)
        (self.data_dir / 'todos').mkdir(parents=True, exist_ok=True)
        (self.data_dir / 'journal').mkdir(parents=True, exist_ok=True)
        (self.data_dir / 'workflows').mkdir(parents=True, exist_ok=True)
        (self.data_dir / 'tags').mkdir(parents=True, exist_ok=True)
        
        # Hidden scrap directory
        self.scrap_dir.mkdir(exist_ok=True)
        
        # Create Docusaurus category files
        self._create_category_files()
    
    def _create_category_files(self) -> None:
        """Create Docusaurus _category_.json files."""
        categories = {
            'ideas': {'label': 'Ideas', 'position': 1},
            'prompts': {'label': 'LLM Prompts', 'position': 2},
            'todos': {'label': 'Todos', 'position': 3},
            'journal': {'label': 'Journal', 'position': 4},
            'workflows': {'label': 'Workflows', 'position': 5},
            'tags': {'label': 'Tags', 'position': 6}
        }
        
        for dir_name, config in categories.items():
            category_file = self.data_dir / dir_name / '_category_.json'
            if not category_file.exists():
                with open(category_file, 'w') as f:
                    json.dump(config, f, indent=2)
    
    def _load_counters(self) -> None:
        """Load ID counters from file."""
        self.counters = {'idea': 0, 'prompt': 0, 'todo': 0, 'journal': 0, 'workflow': 0}
        
        if self.counters_file.exists():
            try:
                with open(self.counters_file, 'r') as f:
                    self.counters.update(json.load(f))
            except Exception:
                pass  # Use defaults if file is corrupted
    
    def _save_counters(self) -> None:
        """Save ID counters to file."""
        try:
            with open(self.counters_file, 'w') as f:
                json.dump(self.counters, f, indent=2)
        except Exception as e:
            print(f"Warning: Could not save counters: {e}")
    
    def _get_next_id(self, entry_type: EntryType) -> str:
        """Get next available ID for entry type."""
        type_name = entry_type.value
        self.counters[type_name] += 1
        self._save_counters()
        return f"{type_name}-{self.counters[type_name]:03d}"
    
    def _title_to_snake_case(self, title: str) -> str:
        """Convert title to snake_case filename."""
        # Remove special characters and replace with spaces
        clean_title = re.sub(r'[^\w\s-]', '', title)
        # Replace spaces and hyphens with underscores
        snake_case = re.sub(r'[\s-]+', '_', clean_title.strip())
        # Convert to lowercase
        snake_case = snake_case.lower()
        # Remove leading/trailing underscores
        snake_case = snake_case.strip('_')
        # Limit length for filesystem compatibility
        if len(snake_case) > 50:
            snake_case = snake_case[:50].rstrip('_')
        return snake_case
    
    def _get_file_path(self, entry: ScrapEntry) -> Path:
        """Get file path for entry based on type - uses snake_case filename from title."""
        # Generate snake_case filename from title
        filename = self._title_to_snake_case(entry.title)
        
        # Fallback to ID if title results in empty filename
        if not filename:
            filename = entry.id
        
        # Handle potential filename conflicts by appending ID if needed
        base_filename = filename
        counter = 1
        
        if entry.entry_type == EntryType.IDEA:
            dir_path = self.data_dir / 'ideas'
        elif entry.entry_type == EntryType.PROMPT:
            dir_path = self.data_dir / 'prompts'
        elif entry.entry_type == EntryType.TODO:
            dir_path = self.data_dir / 'todos'
        elif entry.entry_type == EntryType.JOURNAL:
            dir_path = self.data_dir / 'journal'
        elif entry.entry_type == EntryType.WORKFLOW:
            dir_path = self.data_dir / 'workflows'
        else:
            # Fallback
            dir_path = self.data_dir / entry.entry_type.value
        
        dir_path.mkdir(parents=True, exist_ok=True)
        
        # Check for filename conflicts and append counter if needed
        file_path = dir_path / f"{filename}.md"
        while file_path.exists():
            filename = f"{base_filename}_{counter}"
            file_path = dir_path / f"{filename}.md"
            counter += 1
        
        return file_path
    
    def save_entry(self, entry: ScrapEntry) -> tuple[str, Path]:
        """Save entry to file and return the assigned ID and file path."""
        # Assign ID if not present
        if not entry.id:
            entry.id = self._get_next_id(entry.entry_type)
        
        # Get file path
        file_path = self._get_file_path(entry)
        
        # Create frontmatter
        frontmatter = entry.to_dict()
        
        # Create markdown content
        content = f"---\n{yaml.dump(frontmatter, default_flow_style=False)}---\n\n"
        content += f"# {entry.title}\n\n{entry.content}\n"
        
        if entry.context:
            content += f"\n## Context\n{entry.context}\n"
        
        if entry.tags:
            content += f"\n## Tags\n" + "\n".join(f"- {tag}" for tag in entry.tags) + "\n"
        
        # Write file atomically
        temp_path = file_path.with_suffix('.tmp')
        try:
            with open(temp_path, 'w', encoding='utf-8') as f:
                f.write(content)
            temp_path.rename(file_path)
        except Exception as e:
            if temp_path.exists():
                temp_path.unlink()
            raise e
        
        # Update search index
        self._update_index(entry, file_path)
        
        return entry.id, file_path
    
    def _update_index(self, entry: ScrapEntry, file_path: Path) -> None:
        """Update search index with new entry."""
        index = self._load_index()
        
        index[entry.id] = {
            'id': entry.id,
            'title': entry.title,
            'type': entry.entry_type.value,
            'file_path': str(file_path.relative_to(self.data_dir)),
            'tags': entry.tags,
            'created_date': entry.created_date.isoformat(),
            'status': entry.status.value
        }
        if entry.priority:
            index[entry.id]['priority'] = entry.priority.value
        
        self._save_index(index)
    
    def _load_index(self) -> Dict:
        """Load search index."""
        if self.index_file.exists():
            try:
                with open(self.index_file, 'r') as f:
                    return json.load(f)
            except Exception:
                pass
        return {}
    
    def _save_index(self, index: Dict) -> None:
        """Save search index."""
        try:
            with open(self.index_file, 'w') as f:
                json.dump(index, f, indent=2)
        except Exception as e:
            print(f"Warning: Could not save index: {e}")
    
    def list_entries(self, entry_type: Optional[EntryType] = None, 
                    limit: int = 50) -> List[Dict]:
        """List entries from index."""
        index = self._load_index()
        entries = list(index.values())
        
        if entry_type:
            entries = [e for e in entries if e['type'] == entry_type.value]
        
        # Sort by creation date (newest first)
        entries.sort(key=lambda x: x['created_date'], reverse=True)
        
        return entries[:limit]
    
    def search_entries(self, query: str, entry_type: Optional[EntryType] = None,
                      tags: Optional[List[str]] = None) -> List[Dict]:
        """Search entries by query, type, or tags."""
        index = self._load_index()
        results = []
        
        query_lower = query.lower() if query else ""
        
        for entry in index.values():
            # Type filter
            if entry_type and entry['type'] != entry_type.value:
                continue
            
            # Tag filter
            if tags and not any(tag in entry['tags'] for tag in tags):
                continue
            
            # Query search
            if query_lower:
                if (query_lower in entry['title'].lower() or
                    any(query_lower in tag.lower() for tag in entry['tags'])):
                    results.append(entry)
            else:
                results.append(entry)
        
        # Sort by relevance (title matches first, then tag matches)
        results.sort(key=lambda x: (
            query_lower not in x['title'].lower() if query_lower else False,
            x['created_date']
        ), reverse=True)
        
        return results