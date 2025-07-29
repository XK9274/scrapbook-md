# Random Todo

**Description**: Select and display a random todo entry for LLM-driven task suggestion  
**Allowed Tools**: Bash, Python CLI

## Instructions

1. **Retrieve random todo from the scrapbook system**
2. **Apply optional filters for status and priority**
3. **Display complete todo information including content**
4. **Use for LLM-driven work prioritization and task selection**

## Implementation Steps

1. Execute random todo command:
   ```bash
   scrap random-todo
   ```

2. Filter by status (optional):
   ```bash
   scrap random-todo --status=active    # Only active todos (default)
   scrap random-todo --status=completed # Only completed todos
   scrap random-todo --status=archived  # Only archived todos
   ```

3. Filter by priority (optional):
   ```bash
   scrap random-todo --priority=high    # Only high priority todos
   scrap random-todo --priority=urgent  # Only urgent todos
   scrap random-todo --priority=medium  # Only medium priority todos
   scrap random-todo --priority=low     # Only low priority todos
   ```

4. Combine filters:
   ```bash
   scrap random-todo --status=active --priority=high
   ```

## Output Format

The command displays:
- **Title**: Todo title
- **ID**: Unique identifier (e.g., todo-001)
- **Status**: active/completed/archived
- **Priority**: low/medium/high/urgent (if set)
- **Created**: Creation date
- **Tags**: Associated tags (if any)
- **Content**: Full todo description and context

## Use Cases

### LLM Task Suggestion
When an LLM needs to suggest work to do:
```bash
scrap random-todo --status=active --priority=high
```

### Quick Task Selection
For developers looking for something to work on:
```bash
scrap random-todo --status=active
```

### Review Completed Work
To randomly review finished tasks:
```bash
scrap random-todo --status=completed
```

## Example Output

```
🎯 Random Todo Selected:
Title: Fix memory leak in renderer
ID: todo-015
Type: todo
Status: active
Priority: high
Created: 2024-01-15
Tags: bug, renderer, memory, urgent

Content:
The rendering component has a memory leak when processing large datasets. 
Need to investigate and implement proper cleanup.

## Context
Issue occurs specifically with datasets over 10MB in size.
```

## Integration with LLM Workflows

This command is designed to help LLMs:
- Suggest relevant work based on priority
- Provide complete context for task understanding
- Enable dynamic work prioritization
- Support automated task selection workflows