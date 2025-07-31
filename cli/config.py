"""
Configuration management for scrapbook CLI.
"""

import os
import yaml
from pathlib import Path
from typing import Dict, Any


DEFAULT_CONFIG = {
    'data_dir': './website/docs',
    'default_editor': 'nano',
    'max_search_results': 50,
    'date_format': '%Y-%m-%d %H:%M:%S',
    'auto_tag_extraction': True,
    'backup_enabled': True,
    'backup_count': 5
}


class Config:
    """Configuration manager for scrapbook CLI."""
    
    def __init__(self, config_dir: Path = None):
        """Initialize configuration."""
        if config_dir is None:
            config_dir = Path.home() / '.scrap'
        
        self.config_dir = config_dir
        self.config_file = config_dir / 'config.yaml'
        self.config = DEFAULT_CONFIG.copy()
        
        # Ensure config directory exists
        self.config_dir.mkdir(exist_ok=True)
        
        # Load existing config
        self.load()
    
    def load(self) -> None:
        """Load configuration from file."""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r') as f:
                    user_config = yaml.safe_load(f) or {}
                    self.config.update(user_config)
            except Exception as e:
                print(f"Warning: Could not load config file: {e}")
    
    def save(self) -> None:
        """Save configuration to file."""
        try:
            with open(self.config_file, 'w') as f:
                yaml.dump(self.config, f, default_flow_style=False)
        except Exception as e:
            print(f"Error: Could not save config file: {e}")
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value."""
        return self.config.get(key, default)
    
    def set(self, key: str, value: Any) -> None:
        """Set configuration value."""
        self.config[key] = value
        self.save()
    
    def get_data_dir(self) -> Path:
        """Get data directory as Path object."""
        data_dir = Path(self.get('data_dir'))
        if not data_dir.is_absolute():
            # Search upwards for scrapbook-md directory
            scrapbook_root = self._find_scrapbook_root()
            if scrapbook_root:
                data_dir = scrapbook_root / data_dir
            else:
                data_dir = Path.cwd() / data_dir
        return data_dir
    
    def _find_scrapbook_root(self) -> Path:
        """Find scrapbook-md root directory by searching upwards."""
        current = Path.cwd()
        
        # First check if we're already in scrapbook-md
        if current.name == 'scrapbook-md' and (current / 'cli' / 'cli.py').exists():
            return current
            
        # Search upwards for scrapbook-md directory
        for parent in current.parents:
            scrapbook_dir = parent / 'scrapbook-md'
            if scrapbook_dir.exists() and (scrapbook_dir / 'cli' / 'cli.py').exists():
                return scrapbook_dir
                
        # Also check if scrapbook-md is a sibling directory
        for sibling in current.parent.iterdir():
            if sibling.is_dir() and sibling.name == 'scrapbook-md' and (sibling / 'cli' / 'cli.py').exists():
                return sibling
                
        return None