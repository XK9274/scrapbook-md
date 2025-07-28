# Create Journal Entry

**Description**: Document daily progress, reflections, and development notes  
**Allowed Tools**: Bash, Python CLI

## Instructions

1. **Analyze current conversation for achievements**
2. **Generate meaningful title with date**
3. **Summarize key accomplishments**
4. **Note blockers and solutions**
5. **Create journal entry via scrap CLI**

## Implementation Steps

1. Extract journaling content from context:
   - Tasks completed today
   - Problems solved
   - New insights or learning
   - Blockers encountered
   - Next steps identified

2. Generate meaningful title:
   - Format: "[Main Achievement] - [Date]"
   - Examples: "Authentication System Complete - 2025-07-28"
   - Fallback: "Daily Progress - [Date]"

3. Structure journal content:
   ```markdown
   ## Goals Achieved
   - [List completed tasks/goals]
   
   ## Technical Implementation
   - [Key technical decisions or implementations]
   
   ## Blockers Resolved
   - [Problems that were solved and how]
   
   ## Learnings
   - [New insights or knowledge gained]
   
   ## Next Steps
   - [What to focus on tomorrow/next]
   ```

4. Create journal entry:
   ```bash
   scrap journal "Entry Title - $(date +%Y-%m-%d)" "## Goals Achieved
   [achievements]
   
   ## Technical Implementation  
   [technical details]
   
   ## Blockers Resolved
   [solutions]
   
   ## Next Steps
   [tomorrow's focus]" --tags="daily,$(date +%Y-%m),project-name"
   ```

5. Confirm creation:
   ```bash
   echo "Journal entry created for $(date +%Y-%m-%d)"
   echo "View recent entries: scrap list --type=journal --recent=7"
   ```

## Example Usage

Development progress:
```bash
scrap journal "API Integration Complete - 2025-07-28" "## Goals Achieved
- Successfully connected to external API
- Implemented authentication workflow
- Added error handling for network timeouts

## Technical Implementation
- Used requests library for HTTP communication
- Implemented retry logic with exponential backoff
- Added configuration validation

## Next Steps
- Add support for additional endpoints
- Implement caching layer
- Write unit tests for integration" --tags="daily,2025-07,api,integration"
```