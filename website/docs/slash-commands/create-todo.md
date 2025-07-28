# Create Todo

**Description**: Create a todo entry with proper priority and tagging  
**Allowed Tools**: Bash, Python CLI

## Instructions

1. **Extract todo details from conversation context**
2. **Generate meaningful title**
3. **Set appropriate priority level**
4. **Add relevant tags**
5. **Create todo via scrap CLI**

## Implementation Steps

1. Extract todo details from conversation:
   - Task title (required)
   - Description/details (optional)
   - Priority level (low/medium/high/urgent)
   - Relevant tags from context

2. Determine priority level:
   - **urgent**: Critical bugs, security issues, blockers
   - **high**: Important features, deadlines this week
   - **medium**: Standard tasks, improvements
   - **low**: Nice-to-have, future considerations

3. Create todo entry:
   ```bash
   scrap todo "Task Title" "Detailed description of what needs to be done" --priority="medium" --tags="tag1,tag2,tag3"
   ```

4. Confirm creation:
   ```bash
   echo "Todo created successfully"
   echo "View all todos: scrap list --type=todos"
   echo "View high priority: scrap list --type=todos --priority=high"
   ```

## Example Usage

For a bug fix:
```bash
scrap todo "Fix memory leak in renderer" "The rendering component has a memory leak when processing large datasets. Need to investigate and implement proper cleanup." --priority="high" --tags="bug,renderer,memory,urgent"
```

For a feature request:
```bash
scrap todo "Add dark mode toggle" "Implement dark mode toggle in navigation bar. Should persist user preference and apply theme across all components." --priority="medium" --tags="feature,ui,theme,enhancement"
```