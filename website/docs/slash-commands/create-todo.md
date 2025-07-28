---
sidebar_position: 2
---

# Create Todo

**Description**: Create a todo entry with proper priority and tagging  
**Allowed Tools**: run_in_terminal, Python CLI

## Instructions

1. **Validate todo requirements**
2. **Generate meaningful title from context**
3. **Set appropriate priority level**
4. **Add relevant tags**
5. **Create todo via scrap CLI**
6. **Confirm creation**

## Implementation Steps

1. Extract todo details from conversation context:
   - Task title (required)
   - Description/details (optional)
   - Priority level (low/medium/high/urgent)
   - Relevant tags from context

2. Determine priority level:
   - **urgent**: Critical bugs, security issues, blockers
   - **high**: Important features, deadlines this week
   - **medium**: Standard tasks, improvements
   - **low**: Nice-to-have, future considerations

3. Generate relevant tags:
   - Project name (if applicable)
   - Technology stack (react, python, cli, etc.)
   - Category (bug, feature, docs, test, etc.)
   - Context (review, implement, research, etc.)

4. Create todo entry:
   ```bash
   cd /home/mattpc/HueTesting/scrapbook-md
   ./scrap todo "Task Title" "Detailed description of what needs to be done" --priority="medium" --tags="tag1,tag2,tag3"
   ```

5. Confirm creation and show next steps:
   ```bash
   echo "Todo created successfully"
   echo "View all todos: ./scrap list --type=todos"
   echo "View high priority: ./scrap list --type=todos --priority=high"
   ```

## Example Usage

For a bug fix:
```bash
./scrap todo "Fix memory leak in renderer" "The rendering component has a memory leak when processing large datasets. Need to investigate and implement proper cleanup." --priority="high" --tags="bug,renderer,memory,urgent"
```

For a feature request:
```bash
./scrap todo "Add dark mode toggle" "Implement dark mode toggle in navigation bar. Should persist user preference and apply theme across all components." --priority="medium" --tags="feature,ui,theme,enhancement"
```

For documentation:
```bash
./scrap todo "Update API documentation" "Add examples and improve clarity for the new authentication endpoints" --priority="low" --tags="docs,api,auth"
```

## Priority Guidelines

- **urgent**: Must be done immediately (security, critical bugs)
- **high**: Important for current milestone/sprint
- **medium**: Standard priority tasks
- **low**: Future improvements, nice-to-have features

## Common Tags

- **Project**: scrapbook, hue, terra, etc.
- **Type**: bug, feature, docs, test, refactor
- **Technology**: python, react, cli, api, ui
- **Scope**: frontend, backend, database, deployment
