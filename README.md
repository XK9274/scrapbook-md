# Scrapbook MD

A lightweight CLI tool and documentation website for capturing and organizing ideas, prompts, and todos in markdown format.

## Overview

Scrapbook MD consists of two main components:

1. **Python CLI Tool (`scrap`)** - Command-line interface for creating and managing entries
2. **Docusaurus Website** - Web interface for browsing and searching your content

## Quick Start

### 1. Setup

```bash
# Clone and setup the project
git clone <repository-url>
cd scrapbook_md
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Using the CLI

```bash
# Activate Python environment
source venv/bin/activate

# Add an idea
scrap idea "My brilliant idea" "This is the content of my idea" --context="Project planning" --tags="innovation,planning"

# Add an LLM prompt
scrap prompt "Summarize this article" "Summarize the following article in 3 bullet points: {article_text}" --category="summarization" --tags="llm,agentic"

# Add a todo
scrap todo "Setup project" "Configure development environment" --priority="high" --tags="setup,development"

# Search entries
scrap search "planning"

# List entries
scrap list --type=idea --limit=5

# Show statistics
scrap stats
```

## CLI Commands

### Adding Entries

- `scrap idea <title> <content>` - Add a new idea
- `scrap prompt <title> <content>` - Add a new LLM prompt  
- `scrap todo <title> <content>` - Add a new todo

### Options for All Entry Types

- `--context, -c` - Additional context information
- `--tags, -t` - Comma-separated tags

### Todo-Specific Options

- `--priority, -p` - Priority level (low, medium, high, urgent)
- `--status, -s` - Status (active, completed, archived)

### Prompt-Specific Options

- `--category` - Category for organization (default: general)

### Searching and Listing

- `scrap search <query>` - Search across all entries
  - `--type` - Filter by entry type (idea, prompt, todo)
  - `--tags` - Filter by tags
  - `--limit` - Maximum results

- `scrap list` - List entries
  - `--type` - Filter by entry type
  - `--recent` - Show entries from last N days
  - `--limit` - Maximum results

### Utilities

- `scrap stats` - Show statistics
- `scrap config` - Manage configuration
  - `--set key value` - Set configuration value
  - `--get key` - Get configuration value

## Project Structure

```
scrapbook_md/
├── cli/                    # Python CLI package
│   ├── __init__.py
│   ├── cli.py             # Main CLI interface
│   ├── models.py          # Data models
│   ├── config.py          # Configuration management
│   ├── storage.py         # File storage management
│   └── search.py          # Search functionality
├── website/               # Docusaurus documentation site
│   ├── docs/              # Symlinked to ../data/
│   ├── src/
│   ├── static/
│   ├── docusaurus.config.ts
│   └── package.json
├── data/                  # Markdown content storage
│   ├── ideas/             # Date-organized ideas
│   ├── prompts/           # Category-organized LLM prompts
│   ├── todos/             # Status-organized todos
│   └── tags/              # Auto-generated tag index
├── scripts/               # Utility scripts
│   ├── setup.sh           # Initial setup
│   ├── deploy.sh          # Docker deployment
│   └── backup.sh          # Data backup
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production deployment
└── requirements.txt       # Python dependencies
```

## Data Organization

### Ideas
- Organized by date: `data/ideas/YYYY/MM-month/idea-XXX.md`
- Timeline view in website
- Focus on creative thoughts and insights

### LLM Prompts
- Organized by category: `data/prompts/category/prompt-XXX.md`
- Category-based navigation
- A library of useful prompts for LLMs and agentic use cases.

### Todos
- Organized by status: `data/todos/status/todo-XXX.md`
- Kanban-style view in website
- Task management and progress tracking

### Tags
- Cross-content-type organization
- Auto-generated tag pages
- Enables discovery across different content types

## File Format

Each entry is stored as a markdown file with YAML frontmatter:

```markdown
---
title: "Entry Title"
date: "2024-01-27T10:30:00Z"
type: "idea"
id: "idea-001"
tags: ["tag1", "tag2"]
context: "Additional context"
status: "active"
priority: "medium"
category: "development"  # For prompts only
---

# Entry Title

Main content goes here with full markdown support.

## Context
Additional context information.

## Tags
- tag1
- tag2

```

### 3. Start the Website

```bash
cd website
npm start
```

Visit http://localhost:3000 to view your scrapbook wiki.

## CLI Commands

### Adding Entries

- `scrap idea <title> <content>` - Add a new idea
- `scrap prompt <title> <content>` - Add a new prompt  
- `scrap todo <title> <content>` - Add a new todo

### Options for All Entry Types

- `--context, -c` - Additional context information
- `--tags, -t` - Comma-separated tags
- `--priority, -p` - Priority level (low, medium, high, urgent)

### Todo-Specific Options

- `--status, -s` - Status (active, completed, archived)

### Prompt-Specific Options

- `--category` - Category for organization (default: general)

### Searching and Listing

- `scrap search <query>` - Search across all entries
  - `--type` - Filter by entry type (idea, prompt, todo)
  - `--tags` - Filter by tags
  - `--limit` - Maximum results

- `scrap list` - List entries
  - `--type` - Filter by entry type
  - `--recent` - Show entries from last N days
  - `--limit` - Maximum results

### Utilities

- `scrap stats` - Show statistics
- `scrap config` - Manage configuration
  - `--set key value` - Set configuration value
  - `--get key` - Get configuration value

## Project Structure

```
scrapbook_md/
├── cli/                    # Python CLI package
│   ├── __init__.py
│   ├── cli.py             # Main CLI interface
│   ├── models.py          # Data models
│   ├── config.py          # Configuration management
│   ├── storage.py         # File storage management
│   └── search.py          # Search functionality
├── website/               # Docusaurus documentation site
│   ├── docs/              # Symlinked to ../data/
│   ├── src/
│   ├── static/
│   ├── docusaurus.config.ts
│   └── package.json
├── data/                  # Markdown content storage
│   ├── ideas/             # Date-organized ideas
│   ├── prompts/           # Category-organized prompts
│   ├── todos/             # Status-organized todos
│   └── tags/              # Auto-generated tag index
├── scripts/               # Utility scripts
│   ├── setup.sh           # Initial setup
│   ├── deploy.sh          # Docker deployment
│   └── backup.sh          # Data backup
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production deployment
└── requirements.txt       # Python dependencies
```

## Data Organization

### Ideas
- Organized by date: `data/ideas/YYYY/MM-month/idea-XXX.md`
- Timeline view in website
- Focus on creative thoughts and insights

### Prompts
- Organized by category: `data/prompts/category/prompt-XXX.md`
- Category-based navigation
- Templates and inspiration for various activities

### Todos
- Organized by status: `data/todos/status/todo-XXX.md`
- Kanban-style view in website
- Task management and progress tracking

### Tags
- Cross-content-type organization
- Auto-generated tag pages
- Enables discovery across different content types

## File Format

Each entry is stored as a markdown file with YAML frontmatter:

```markdown
---
title: "Entry Title"
date: "2024-01-27T10:30:00Z"
type: "idea"
id: "idea-001"
tags: ["tag1", "tag2"]
context: "Additional context"
status: "active"
priority: "medium"
category: "development"  # For prompts only
---

# Entry Title

Main content goes here with full markdown support.

## Context
Additional context information.

## Tags
- tag1
- tag2
```

## Docker Deployment

### Development

```bash
# Start development environment
docker-compose up -d

# View at http://localhost:3000
```

### Production

```bash
# Deploy production environment
./scripts/deploy.sh production

# View at http://localhost:80
```

## Configuration

CLI configuration is stored in `~/.scrap/config.yaml`:

```yaml
data_dir: './data'
default_editor: 'nano'
max_search_results: 50
date_format: '%Y-%m-%d %H:%M:%S'
auto_tag_extraction: true
backup_enabled: true
backup_count: 5
```

## Features

### CLI Features
- ✅ Cross-platform Python CLI tool
- ✅ Structured markdown output with YAML frontmatter
- ✅ Tag-based organization and search
- ✅ Configurable settings
- ✅ Search across all content types
- ✅ Statistics and usage tracking

### Website Features
- ✅ Responsive Docusaurus documentation site
- ✅ Content-type-specific styling and organization
- ✅ Search functionality across all entries
- ✅ Tag-based filtering and navigation
- ✅ Timeline view for ideas
- ✅ Mobile-friendly responsive design

### Integration
- ✅ Seamless integration between CLI and website
- ✅ Hot reload - changes appear immediately
- ✅ Docker deployment for easy hosting
- ✅ Backup and restore functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `./scripts/setup.sh`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation at the website
- Review the CLI help: `scrap --help`
