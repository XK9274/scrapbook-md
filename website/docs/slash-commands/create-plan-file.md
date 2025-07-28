# Create Plan File

**Description**: Save the current outline to a versioned plan file  
**Allowed Tools**: Bash(echo), Bash(date)

## Instructions

1. **Read the latest outline** from the conversation
2. **Determine the next version number** (v001, then v002, v003, ...)
3. **Create plan-$NEXT_VERSION.md** in the project root
4. **Add heading**: "Plan $NEXT_VERSION"
5. **Paste the outline** below the heading
6. **Append**: "Created: <UTC timestamp>"
7. **Confirm the file is saved**

## Implementation Steps

1. Check existing plan files to determine next version:
   ```bash
   ls plan-v*.md 2>/dev/null | wc -l
   ```

2. Generate version number (increment by 1, pad with zeros):
   ```bash
   NEXT_VERSION=$(printf "v%03d" $(($(ls plan-v*.md 2>/dev/null | wc -l) + 1)))
   ```

3. Create plan file with UTC timestamp:
   ```bash
   echo "# Plan $NEXT_VERSION" > plan-$NEXT_VERSION.md
   echo "" >> plan-$NEXT_VERSION.md
   # Paste outline content here
   echo "" >> plan-$NEXT_VERSION.md
   echo "Created: $(date -u '+%Y-%m-%d %H:%M:%S UTC')" >> plan-$NEXT_VERSION.md
   ```

4. Confirm creation:
   ```bash
   echo "Plan file created: plan-$NEXT_VERSION.md"
   ls -la plan-$NEXT_VERSION.md
   ```