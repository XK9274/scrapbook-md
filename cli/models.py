"""
Data models and validation for scrapbook entries.
"""

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import List, Optional


class EntryType(Enum):
    """Entry types for scrapbook items."""
    IDEA = "idea"
    PROMPT = "prompt"
    TODO = "todo"
    JOURNAL = "journal"


class Status(Enum):
    """Status values for entries."""
    ACTIVE = "active"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class Priority(Enum):
    """Priority levels for entries."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


@dataclass
class ScrapEntry:
    """Data model for a scrapbook entry."""
    title: str
    content: str
    context: str
    tags: List[str]
    entry_type: EntryType
    created_date: datetime
    status: Status = Status.ACTIVE
    priority: Optional[Priority] = None
    category: Optional[str] = None
    id: Optional[str] = None

    def to_dict(self) -> dict:
        """Convert entry to dictionary for YAML serialization."""
        return {
            'title': self.title,
            'date': self.created_date.isoformat(),
            'type': self.entry_type.value,
            'tags': self.tags,
            'context': self.context,
            'status': self.status.value,
            'priority': self.priority.value,
            'category': self.category,
            'id': self.id
        }

    @classmethod
    def from_dict(cls, data: dict) -> 'ScrapEntry':
        """Create entry from dictionary."""
        return cls(
            title=data['title'],
            content=data.get('content', ''),
            context=data.get('context', ''),
            tags=data.get('tags', []),
            entry_type=EntryType(data['type']),
            created_date=datetime.fromisoformat(data['date']),
            status=Status(data.get('status', 'active')),
            priority=Priority(data.get('priority')) if data.get('priority') else None,
            category=data.get('category'),
            id=data.get('id')
        )