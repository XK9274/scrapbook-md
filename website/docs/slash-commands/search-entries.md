---
sidebar_position: 7
---

# Search Entries

**Description**: Find and browse existing scrapbook content  
**Allowed Tools**: run_in_terminal, Python CLI

## Instructions

1. **Analyze search intent from conversation**
2. **Choose appropriate search strategy**
3. **Execute search with proper filters**
4. **Present results in useful format**
5. **Suggest related content or actions**

## Implementation Steps

1. Determine search strategy:
   - **Keyword search**: Find content containing specific terms
   - **Type filter**: Browse specific entry types (ideas, todos, etc.)
   - **Tag filter**: Find entries with particular tags
   - **Date range**: Recent entries or specific time periods
   - **Status filter**: Active todos, completed tasks, etc.

2. Extract search parameters:
   - Search terms or keywords
   - Content type preference
   - Time relevance (recent, all-time)
   - Tag or category filters
   - Priority or status filters

3. Execute appropriate search command:
   ```bash
   cd /home/mattpc/HueTesting/scrapbook-md
   
   # Basic keyword search
   ./scrap search "keyword" --type="all"
   
   # Type-specific search
   ./scrap search "term" --type="ideas"
   
   # Tag-based search
   ./scrap list --tags="tag1,tag2"
   
   # Recent entries
   ./scrap list --recent=10
   
   # Priority-filtered todos
   ./scrap list --type="todos" --priority="high"
   ```

4. Format and present results:
   - Show relevant matches with context
   - Group by type if mixed results
   - Highlight matching terms
   - Include creation dates and tags

5. Suggest follow-up actions:
   - Related searches
   - Content creation opportunities
   - Link to similar entries

## Example Usage

General keyword search:
```bash
cd /home/mattpc/HueTesting/scrapbook-md

# Search for authentication-related content
./scrap search "authentication" --type="all"

echo "Found authentication-related entries. Consider these follow-ups:"
echo "- View only ideas: ./scrap search 'authentication' --type=ideas"
echo "- Check related todos: ./scrap search 'auth' --type=todos"
echo "- See recent auth work: ./scrap list --tags=auth --recent=30"
```

Find high-priority todos:
```bash
# Search for urgent tasks
./scrap list --type="todos" --priority="high"

echo "High priority todos found. Related actions:"
echo "- Create new urgent todo: ./scrap todo 'title' 'desc' --priority=urgent"
echo "- Review completed: ./scrap list --type=todos --status=completed"
```

Browse recent development work:
```bash
# Find recent development-related entries
./scrap search "development" --recent=7

echo "Recent development entries found. You might also want:"
echo "- Journal entries: ./scrap list --type=journal --recent=7"
echo "- Development workflows: ./scrap search 'development' --type=workflows"
```

Find entries by technology:
```bash
# Search for React-related content
./scrap search "react" --type="all"
./scrap list --tags="react"

echo "React content found. Related searches:"
echo "- Frontend ideas: ./scrap search 'frontend' --type=ideas"
echo "- UI workflows: ./scrap list --tags=ui --type=workflows"
```

## Search Strategies

### By Content Type
```bash
# Ideas and brainstorming
./scrap search "keyword" --type="ideas"

# Active tasks
./scrap list --type="todos" --status="active"

# Technical documentation
./scrap search "keyword" --type="workflows"

# Daily logs
./scrap list --type="journal" --recent=30
```

### By Tags
```bash
# Project-specific content
./scrap list --tags="project-name"

# Technology stack
./scrap list --tags="python,cli"

# Work type
./scrap list --tags="bug,urgent"
```

### By Date/Recency
```bash
# This week's work
./scrap list --recent=7

# Last month's todos
./scrap list --type="todos" --recent=30

# All-time search
./scrap search "keyword" --type="all"
```

## Search Tips

1. **Use specific terms**: "authentication" vs "auth"
2. **Combine filters**: Type + tags + recency
3. **Check related tags**: Often reveals related content
4. **Try synonyms**: Different ways to describe same concept
5. **Browse by date**: Recent work often most relevant

## Result Analysis

When presenting search results:
- Count total matches found
- Show most relevant entries first
- Include entry dates and types
- Highlight why each result matched
- Suggest refinements if too many/few results
- Recommend related content or next actions

## Follow-up Suggestions

After successful searches:
- Create new entry if gap identified
- Update existing entry with new information
- Link related entries together
- Create todo for further investigation
- Document insights in journal entry
