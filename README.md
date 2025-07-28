# scrapbook-md

<div align="center">
  <img src="assets/scrapbook-md.png" alt="scrapbook-md" />
</div>

A lightweight CLI tool and documentation website for quickly capturing and organizing ideas, prompts, todos, journal entries, and workflows in markdown format.

## Quick Setup

```bash
# Clone and setup in one command
git clone https://github.com/XK9274/scrapbook-md.git
cd scrapbook-md
./setup.sh
```

After setup, you can use the CLI:

```bash
# Add different types of entries
./scrap idea "Smart Home Automation" "Voice-controlled IoT system with learning capabilities" --tags="iot,automation"
./scrap prompt "Code Review Assistant" "Review this code for bugs, performance issues, and best practices" --category="development"
./scrap todo "Update documentation" "Review and update the README file" --priority="high"
./scrap journal "Sprint Retrospective" "Team velocity improved 20% after implementing pair programming"
./scrap workflow "CI/CD Pipeline Setup" "Steps to configure automated testing and deployment" --category="deployment"

# Search and list entries
./scrap search "development"
./scrap list --type=idea --limit=10
./scrap stats
```

## CLI Commands

### Entry Commands

| Command | Description | Example |
|---------|-------------|---------|
| `idea` | Add a new idea | `./scrap idea "My idea" "Description" --tags="innovation"` |
| `prompt` | Add LLM prompt | `./scrap prompt "Summarizer" "Summarize this text" --category="general"` |
| `todo` | Add todo item | `./scrap todo "Fix bug" "Resolve login issue" --priority="urgent"` |
| `journal` | Add journal entry | `./scrap journal "Daily notes" "Today I learned..." --tags="learning"` |
| `workflow` | Document process | `./scrap workflow "Deploy process" "Steps to deploy" --category="deployment"` |

### Search & List Commands

| Command | Description | Options |
|---------|-------------|---------|
| `search <query>` | Search entries | `--type`, `--tags`, `--limit` |
| `list` | List entries | `--type`, `--recent`, `--limit` |

### Utility Commands

| Command | Description |
|---------|-------------|
| `stats` | Show statistics |
| `config` | Manage configuration |

## Common Options

- `--context, -c` - Additional context
- `--tags, -t` - Comma-separated tags  
- `--priority, -p` - Priority (low, medium, high, urgent)
- `--category` - Category for organization
- `--status, -s` - Status (active, completed, archived)

## Optional: Global Access

To use `scrap` from anywhere:

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH="/path/to/scrapbook-md:$PATH"

# Now you can use scrap from any directory
scrap idea "Global idea" "This works from anywhere"
```

## Website

Start the documentation website to browse your entries:

```bash
cd website
npm install
npm start
```

Visit http://localhost:3000 to view your scrapbook.

## Project Structure

```
scrapbook-md/
├── cli/                   # Python CLI package
├── website/              # Docusaurus documentation site
├── data/                 # Markdown content storage
├── setup.sh             # Setup script
├── pyproject.toml       # Python package configuration
└── LICENSE              # MIT License
```

## Requirements

- Python 3.8 or higher
- Node.js (for website)
- Git

## License

MIT License - see [LICENSE](LICENSE) file for details.
