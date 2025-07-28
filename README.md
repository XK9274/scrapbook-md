# Scrapbook MD

<div align="center">
  <img src="assets/scrapbook_md.png" alt="Scrapbook MD" />
</div>

A lightweight CLI tool and documentation website for quickly capturing and organizing ideas, prompts, and todos in markdown format using a python CLI tool - create tools in your LLM to automatically add markdown generate content at hookpoints, during project planning or as part of a workflow.

## USAGE

### Quick Setup (Recommended)

```bash
# Clone and setup in one command
git clone https://github.com/XK9274/scrapbook_md.git
cd scrapbook_md
./setup.sh
```

After setup, use the CLI directly:

```bash
# Add different types of entries
./scrap idea "My innovative idea" "Description of the idea" --tags="innovation,planning"
./scrap prompt "Code reviewer" "Review this code for bugs and improvements: {code}" --category="development"
./scrap todo "Setup development environment" "Install all necessary tools" --priority="high"
./scrap journal "Daily reflection" "Today I learned about..." --tags="learning,daily"

# Search and list entries
./scrap search "development"
./scrap list --type=idea --limit=10

# View statistics
./scrap stats
```

### Optional: Add to PATH

To use `scrap` from anywhere:

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH="$(pwd):$PATH"

# Now you can use scrap from anywhere
scrap idea "Global idea" "This works from any directory"
```

### Docker Development (Alternative)

```bash
# Start the development environment
docker-compose up -d

# Access the website at http://localhost:3000
```

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [CLI Commands](#cli-commands)
4. [Project Structure](#project-structure)
5. [Data Organization](#data-organization)
6. [File Format](#file-format)
7. [Docker Deployment](#docker-deployment)
8. [Configuration](#configuration)
9. [Features](#features)
10. [Contributing](#contributing)
11. [License](#license)
12. [Support](#support)

## Overview

Scrapbook MD consists of two main components:

1. **Python CLI Tool (`scrap`)** - Command-line interface for creating and managing entries
2. **Docusaurus Website** - Web interface for browsing and searching your content

## Quick Start

### 1. Setup

```bash
# Clone and setup the project
git clone https://github.com/XK9274/scrapbook_md.git
cd scrapbook_md
./setup.sh
```

### 2. Using the CLI

```bash
# Add an idea
./scrap idea "My brilliant idea" "This is the content of my idea" --context="Project planning" --tags="innovation,planning"

# Add an LLM prompt
./scrap prompt "Summarize this article" "Summarize the following article in 3 bullet points: {article_text}" --category="summarization" --tags="llm,agentic"

# Add a todo
./scrap todo "Setup project" "Configure development environment" --priority="high" --tags="setup,development"

# Search entries
./scrap search "planning"

# List entries
./scrap list --type=idea --limit=5

# Show statistics
./scrap stats
```

### 3. Start the Website

```bash
cd website
npm install
npm start
```

Visit http://localhost:3000 to view your scrapbook wiki.

## CLI Commands

### Adding Entries

- `./scrap idea <title> <content>` - Add a new idea
- `./scrap prompt <title> <content>` - Add a new LLM prompt  
- `./scrap todo <title> <content>` - Add a new todo

### Options for All Entry Types

- `--context, -c` - Additional context information
- `--tags, -t` - Comma-separated tags

### Entry-Specific Options

**Todo Options:**
- `--priority, -p` - Priority level (low, medium, high, urgent)
- `--status, -s` - Status (active, completed, archived)

**Prompt Options:**
- `--category` - Category for organization (default: general)

### Searching and Listing

- `./scrap search <query>` - Search across all entries
  - `--type` - Filter by entry type (idea, prompt, todo)
  - `--tags` - Filter by tags
  - `--limit` - Maximum results

- `./scrap list` - List entries
  - `--type` - Filter by entry type
  - `--recent` - Show entries from last N days
  - `--limit` - Maximum results

### Utilities

- `./scrap stats` - Show statistics
- `./scrap config` - Manage configuration
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
- A library of useful prompts for LLMs and agentic use cases

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
- Basic entry creation (ideas, prompts, todos, journal)
- Markdown files with YAML frontmatter
- Tag-based organization
- Simple text search functionality
- Basic listing and filtering by type
- Configuration management
- Entry statistics

### Website Features
- Static Docusaurus documentation site
- Content browsing by type (ideas, prompts, todos)
- Basic navigation and organization
- Responsive design

### Integration
- CLI generates markdown files for website
- File-based storage system
- Docker containerization

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
