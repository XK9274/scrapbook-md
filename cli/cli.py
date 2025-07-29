"""
Command-line interface for scrapbook.
"""

import click
from datetime import datetime
from pathlib import Path
from typing import List, Optional
try:
    from .models import ScrapEntry, EntryType, Status, Priority
    from .config import Config
    from .storage import StorageManager
    from .search import SearchEngine
except ImportError:
    from models import ScrapEntry, EntryType, Status, Priority
    from config import Config
    from storage import StorageManager
    from search import SearchEngine


@click.group(invoke_without_command=True)
@click.option('--config', help='Show configuration')
@click.pass_context
def main(ctx, config):
    """Scrapbook - A lightweight CLI tool for capturing ideas, prompts, and todos."""
    # Initialize config and storage
    ctx.ensure_object(dict)
    ctx.obj['config'] = Config()
    ctx.obj['storage'] = StorageManager(ctx.obj['config'])
    ctx.obj['search'] = SearchEngine(ctx.obj['config'], ctx.obj['storage'])
    
    if config:
        show_config(ctx.obj['config'])
        return
    
    if ctx.invoked_subcommand is None:
        click.echo(ctx.get_help())


@main.command('idea')
@click.argument('title')
@click.argument('content')
@click.option('--context', '-c', default='', help='Additional context')
@click.option('--tags', '-t', default='', help='Comma-separated tags')
@click.option('--priority', '-p', type=click.Choice(['low', 'medium', 'high', 'urgent']), 
              default='medium', help='Priority level')
@click.pass_context
def add_idea(ctx, title, content, context, tags, priority):
    """Add a new idea (-I shortcut)."""
    _add_entry(ctx, EntryType.IDEA, title, content, context, tags, priority)


@main.command('prompt')
@click.argument('title')
@click.argument('content')
@click.option('--context', '-c', default='', help='Additional context')
@click.option('--tags', '-t', default='', help='Comma-separated tags')
@click.option('--category', default='general', help='Prompt category')
@click.pass_context
def add_prompt(ctx, title, content, context, tags, category):
    """Add a new prompt (for LLMs)."""
    _add_entry(ctx, EntryType.PROMPT, title, content, context, tags, category=category)


@main.command('todo')
@click.argument('title')
@click.argument('content')
@click.option('--context', '-c', default='', help='Additional context')
@click.option('--tags', '-t', default='', help='Comma-separated tags')
@click.option('--priority', '-p', type=click.Choice(['low', 'medium', 'high', 'urgent']), 
              default='medium', help='Priority level')
@click.option('--status', '-s', type=click.Choice(['active', 'completed', 'archived']), 
              default='active', help='Todo status')
@click.pass_context
def add_todo(ctx, title, content, context, tags, priority, status):
    """Add a new todo (-T shortcut)."""
    _add_entry(ctx, EntryType.TODO, title, content, context, tags, priority, status=status)


@main.command('journal')
@click.argument('title')
@click.argument('content')
@click.option('--context', '-c', default='', help='Additional context')
@click.option('--tags', '-t', default='', help='Comma-separated tags')
@click.option('--priority', '-p', type=click.Choice(['low', 'medium', 'high', 'urgent']), 
              default='medium', help='Priority level')
@click.pass_context
def add_journal(ctx, title, content, context, tags, priority):
    """Add a new journal entry (-J shortcut)."""
    _add_entry(ctx, EntryType.JOURNAL, title, content, context, tags, priority)


@main.command('workflow')
@click.argument('title')
@click.argument('content')
@click.option('--context', '-c', default='', help='Additional context')
@click.option('--tags', '-t', default='', help='Comma-separated tags')
@click.option('--category', default='general', help='Workflow category (development, automation, deployment, etc.)')
@click.option('--priority', '-p', type=click.Choice(['low', 'medium', 'high', 'urgent']), 
              default='medium', help='Priority level')
@click.pass_context
def add_workflow(ctx, title, content, context, tags, category, priority):
    """Add a new workflow or process documentation."""
    _add_entry(ctx, EntryType.WORKFLOW, title, content, context, tags, category, priority=priority)


@main.command('search')
@click.argument('query')
@click.option('--type', '-t', type=click.Choice(['idea', 'prompt', 'todo', 'journal', 'workflow']), 
              help='Filter by entry type')
@click.option('--tags', help='Filter by tags (comma-separated)')
@click.option('--limit', '-l', type=int, default=10, help='Maximum results')
@click.pass_context
def search_entries(ctx, query, type, tags, limit):
    """Search entries by query."""
    search_engine = ctx.obj['search']
    
    entry_type = EntryType(type) if type else None
    tag_list = [t.strip() for t in tags.split(',')] if tags else None
    
    results = search_engine.search(query, entry_type, tag_list, limit)
    
    if not results:
        click.echo("No results found.")
        return
    
    click.echo(f"Found {len(results)} results:\n")
    for result in results:
        _display_entry_summary(result)


@main.command('list')
@click.option('--type', '-t', type=click.Choice(['idea', 'prompt', 'todo', 'journal', 'workflow']), 
              help='Filter by entry type')
@click.option('--recent', '-r', type=int, help='Show entries from last N days')
@click.option('--limit', '-l', type=int, default=10, help='Maximum results')
@click.pass_context
def list_entries(ctx, type, recent, limit):
    """List entries."""
    search_engine = ctx.obj['search']
    
    if recent:
        results = search_engine.list_recent(recent, limit)
        click.echo(f"Entries from last {recent} days:\n")
    elif type:
        entry_type = EntryType(type)
        results = search_engine.list_by_type(entry_type, limit)
        click.echo(f"{type.title()}s:\n")
    else:
        storage = ctx.obj['storage']
        results = storage.list_entries(limit=limit)
        click.echo("Recent entries:\n")
    
    if not results:
        click.echo("No entries found.")
        return
    
    for result in results:
        _display_entry_summary(result)


@main.command('stats')
@click.pass_context
def show_stats(ctx):
    """Show statistics about entries."""
    search_engine = ctx.obj['search']
    
    stats = search_engine.get_statistics()
    tag_stats = search_engine.get_tag_statistics()
    
    click.echo("Scrapbook Statistics\n")
    click.echo(f"Total entries: {stats['total_entries']}")
    click.echo(f"Ideas: {stats['ideas']}")
    click.echo(f"Prompts: {stats['prompts']}")
    click.echo(f"Todos: {stats['todos']} ({stats['active_todos']} active, {stats['completed_todos']} completed)")
    click.echo(f"Journal entries: {stats['journals']}")
    click.echo(f"Workflows: {stats.get('workflows', 0)}")
    
    if tag_stats:
        click.echo(f"\nTop tags:")
        for tag, count in list(tag_stats.items())[:10]:
            click.echo(f"  {tag}: {count}")


@main.command('random-todo')
@click.option('--status', '-s', type=click.Choice(['active', 'completed', 'archived']),
              default='active', help='Filter by todo status (default: active)')
@click.option('--priority', '-p', type=click.Choice(['low', 'medium', 'high', 'urgent']),
              help='Filter by priority level')
@click.pass_context
def random_todo(ctx, status, priority):
    """Get a random todo entry (useful for LLMs to suggest work)."""
    import random
    from datetime import datetime
    
    storage = ctx.obj['storage']
    
    # Get all todos
    todos = storage.list_entries(entry_type=EntryType.TODO, limit=1000)
    
    # Filter by status
    if status:
        todos = [t for t in todos if t.get('status', 'active') == status]
    
    # Filter by priority if specified
    if priority:
        todos = [t for t in todos if t.get('priority') == priority]
    
    if not todos:
        status_msg = f" with status '{status}'" if status != 'active' else ""
        priority_msg = f" and priority '{priority}'" if priority else ""
        click.echo(f"No todos found{status_msg}{priority_msg}.")
        return
    
    # Select random todo
    random_todo = random.choice(todos)
    
    # Display the random todo
    click.echo("🎯 Random Todo Selected:")
    click.echo(f"Title: {random_todo['title']}")
    click.echo(f"ID: {random_todo['id']}")
    click.echo(f"Type: {random_todo['type']}")
    click.echo(f"Status: {random_todo.get('status', 'active')}")
    if random_todo.get('priority'):
        click.echo(f"Priority: {random_todo['priority']}")
    click.echo(f"Created: {random_todo['created_date'][:10]}")
    if random_todo.get('tags'):
        click.echo(f"Tags: {', '.join(random_todo['tags'])}")
    click.echo()
    
    # Try to read and display the content
    try:
        config = ctx.obj['config']
        data_dir = config.get_data_dir()
        file_path = data_dir / random_todo['file_path']
        
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract content between frontmatter and first heading
            lines = content.split('\n')
            in_content = False
            content_lines = []
            
            for line in lines:
                if line.startswith('---') and not in_content:
                    in_content = True
                    continue
                elif line.startswith('---') and in_content:
                    in_content = False
                    continue
                elif not in_content and line.startswith('# '):
                    continue  # Skip title heading
                elif not in_content:
                    content_lines.append(line)
            
            content_text = '\n'.join(content_lines).strip()
            if content_text:
                click.echo("Content:")
                click.echo(content_text)
                
    except Exception as e:
        click.echo(f"Could not read todo content: {e}")


@main.command('config')
@click.option('--set', 'set_config', nargs=2, help='Set config key value')
@click.option('--get', 'get_config', help='Get config value')
@click.pass_context
def manage_config(ctx, set_config, get_config):
    """Manage configuration."""
    config = ctx.obj['config']
    
    if set_config:
        key, value = set_config
        config.set(key, value)
        click.echo(f"Set {key} = {value}")
    elif get_config:
        value = config.get(get_config)
        click.echo(f"{get_config} = {value}")
    else:
        show_config(config)


def _add_entry(ctx, entry_type: EntryType, title: str, content: str, 
               context: str, tags: str, category: str = None, 
               status: str = 'active', priority: str = None):
    """Helper function to add an entry."""
    storage = ctx.obj['storage']
    
    # Parse tags
    tag_list = [t.strip() for t in tags.split(',') if t.strip()] if tags else []
    
    # Create entry
    entry = ScrapEntry(
        title=title,
        content=content,
        context=context,
        tags=tag_list,
        entry_type=entry_type,
        created_date=datetime.now(),
        status=Status(status),
        category=category
    )
    if priority:
        entry.priority = Priority(priority)
    
    # Save entry
    entry_id, file_path = storage.save_entry(entry)
    
    # Get relative path from current working directory for better readability
    try:
        rel_path = file_path.relative_to(Path.cwd())
        path_display = str(rel_path)
    except ValueError:
        # If not relative to cwd, show full path
        path_display = str(file_path)
    
    click.echo(f"{entry_type.value.title()} saved as: {path_display}")


def _display_entry_summary(entry: dict):
    """Display a summary of an entry."""
    type_emoji = {'idea': '', 'prompt': '', 'todo': '', 'journal': '', 'workflow': ''}
    emoji = type_emoji.get(entry['type'], '')
    
    click.echo(f"{emoji} {entry['title']} ({entry['id']})")
    click.echo(f"   Type: {entry['type']} | Created: {entry['created_date'][:10]}")
    if entry.get('tags'):
        click.echo(f"   Tags: {', '.join(entry['tags'])}")
    click.echo()


def show_config(config: Config):
    """Display current configuration."""
    click.echo("Scrapbook Configuration\n")
    for key, value in config.config.items():
        click.echo(f"{key}: {value}")


# Shortcut commands
@main.command('i', hidden=True)
@click.pass_context
def idea_shortcut(ctx):
    """Shortcut for 'scrap idea' command."""
    ctx.invoke(add_idea)


@main.command('p', hidden=True)
@click.pass_context
def prompt_shortcut(ctx):
    """Shortcut for 'scrap prompt' command."""
    ctx.invoke(add_prompt)


@main.command('t', hidden=True)
@click.pass_context
def todo_shortcut(ctx):
    """Shortcut for 'scrap todo' command."""
    ctx.invoke(add_todo)


if __name__ == '__main__':
    main()