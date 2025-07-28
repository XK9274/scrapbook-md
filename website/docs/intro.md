---
sidebar_position: 1
slug: /
---

# Welcome

Your personal knowledge wiki for capturing **ideas**, **prompts**, and **todos**.

Think of it as a dev companion - Generally in VS Code i have multiple terminals open at any time, meaning from any terminal i can quickly capture an idea, prompt, or todo without needing to switch context or open a separate app.

You can use the slash commands in VS Code, terminal environments, or any Claude interface. See **[Slash Commands](./slash-commands)** for Claude-compatible automation. 

Scrapbook is a lightweight documentation system that combines a powerful CLI tool with a modern web interface. Organize your thoughts, track tasks, store prompts, and maintain workflows—all in markdown format.

## What You Can Do

- **Capture Ideas** - Store creative thoughts with tags and categories
- **Manage Tasks** - Track todos with priorities and status
- **Save Prompts** - Keep templates and inspiration organized  
- **Create Workflows** - Document processes and procedures
- **Journal** - Daily notes and development logs
- **Search Everything** - Find content across all entry types

## Getting Started

Setup is simple with our automated script:

```bash
# Clone and setup
git clone https://github.com/XK9274/scrapbook-md.git
cd scrapbook-md
./setup.sh
```

### Quick CLI Examples

```bash
# Add an idea
./scrap idea "My brilliant idea" "Content here" --tags="tag1,tag2"

# Add a todo with priority
./scrap todo "Complete task" "Task description" --priority="high"

# Search your entries
./scrap search "keyword" --type="ideas"

### CLI Commands Overview

The CLI supports these main entry types:

```bash
# Ideas - Creative thoughts and brainstorming
./scrap idea "Title" "Content" --tags="tag1,tag2"

# Prompts - Templates and inspiration
./scrap prompt "Prompt name" "Your prompt text" --category="general"

# Todos - Tasks with priorities and status tracking
./scrap todo "Task" "Description" --priority="high" --status="active"

# Journal - Daily reflections and logs
./scrap journal "Entry title" "Today's thoughts" --tags="daily"

# Workflows - Process documentation
./scrap workflow "Process name" "Step-by-step guide" --category="development"
```

### Search and Browse

```bash
# Search across all content
./scrap search "keyword" --type="ideas"

# List recent entries
./scrap list --recent=10

# Browse by type or tags
./scrap list --type="todos" --tags="urgent"
```

### Web Interface Features

This documentation site provides:
- **Organized browsing** by content type
- **Full-text search** across all entries
- **Tag-based filtering** and navigation
- **Category organization** for better structure
- **Mermaid diagram support** for visual documentation

## CLI Documentation

- **[Quick Start](./cli/quick-start)** - Installation and first steps
- **[Entry Commands](./cli/entry-commands)** - Create ideas, todos, prompts, journals, workflows
- **[Search Commands](./cli/search-commands)** - Find and browse entries
- **[Utility Commands](./cli/utility-commands)** - Additional tools and helpers

## Browse Content

- **[Ideas](./category/ideas)** - Creative thoughts and insights
- **[Prompts](./category/prompts)** - Templates and inspiration
- **[Todos](./category/todos)** - Tasks and action items
- **[Journal](./category/journal)** - Daily thoughts and development notes
- **[Workflows](./category/workflows)** - Automated processes and workflows
- **[Diagrams](./category/diagrams)** - Visual representations and charts

## Search

Use the search functionality to find content across all types.

---

*Built with Docusaurus + Python CLI*