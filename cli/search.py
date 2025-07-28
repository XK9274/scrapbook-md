"""
Search and listing functionality for scrapbook entries.
"""

from typing import List, Dict, Optional
try:
    from .models import EntryType
    from .storage import StorageManager
    from .config import Config
except ImportError:
    from models import EntryType
    from storage import StorageManager
    from config import Config


class SearchEngine:
    """Search engine for scrapbook entries."""
    
    def __init__(self, config: Config, storage: StorageManager):
        """Initialize search engine."""
        self.config = config
        self.storage = storage
    
    def search(self, query: str, entry_type: Optional[EntryType] = None,
               tags: Optional[List[str]] = None, limit: int = None) -> List[Dict]:
        """Search entries with query and filters."""
        if limit is None:
            limit = self.config.get('max_search_results', 50)
        
        results = self.storage.search_entries(query, entry_type, tags)
        return results[:limit]
    
    def list_by_type(self, entry_type: EntryType, limit: int = None) -> List[Dict]:
        """List entries by type."""
        if limit is None:
            limit = self.config.get('max_search_results', 50)
        
        return self.storage.list_entries(entry_type, limit)
    
    def list_recent(self, days: int = 7, limit: int = None) -> List[Dict]:
        """List recent entries from the last N days."""
        if limit is None:
            limit = self.config.get('max_search_results', 50)
        
        from datetime import datetime, timedelta
        cutoff_date = datetime.now() - timedelta(days=days)
        
        all_entries = self.storage.list_entries(limit=1000)  # Get more to filter
        recent = [e for e in all_entries 
                 if datetime.fromisoformat(e['created_date']) > cutoff_date]
        
        return recent[:limit]
    
    def get_tag_statistics(self) -> Dict[str, int]:
        """Get tag usage statistics."""
        index = self.storage._load_index()
        tag_counts = {}
        
        for entry in index.values():
            for tag in entry.get('tags', []):
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
        
        # Sort by frequency
        return dict(sorted(tag_counts.items(), key=lambda x: x[1], reverse=True))
    
    def get_statistics(self) -> Dict[str, int]:
        """Get general statistics about entries."""
        index = self.storage._load_index()
        stats = {
            'total_entries': len(index),
            'ideas': 0,
            'prompts': 0,
            'todos': 0,
            'journals': 0,
            'active_todos': 0,
            'completed_todos': 0
        }
        
        for entry in index.values():
            entry_type = entry['type']
            stats[entry_type + 's'] = stats.get(entry_type + 's', 0) + 1
            
            if entry_type == 'todo':
                status = entry.get('status', 'active')
                stats[f"{status}_todos"] = stats.get(f"{status}_todos", 0) + 1
        
        return stats