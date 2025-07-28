# Create Idea

**Description**: Capture creative thoughts and insights with proper categorization  
**Allowed Tools**: Bash, Python CLI

## Instructions

1. **Extract idea from conversation context**
2. **Generate descriptive title**
3. **Categorize appropriately**
4. **Add relevant tags**
5. **Create idea via scrap CLI**

## Implementation Steps

1. Identify the core idea from conversation context

2. Generate clear, descriptive title:
   - Keep it concise but specific
   - Include key concepts
   - Make it searchable

3. Choose appropriate category:
   - **feature**: New functionality ideas
   - **improvement**: Enhancements to existing systems
   - **architecture**: System design concepts
   - **research**: Areas to investigate
   - **creative**: Artistic or design concepts
   - **business**: Strategy or process ideas

4. Create idea entry:
   ```bash
   scrap idea "Idea Title" "Detailed description of the idea, including context, potential implementation approaches, and expected benefits." --category="feature" --tags="tag1,tag2,tag3"
   ```

5. Confirm creation:
   ```bash
   echo "Idea captured successfully"
   echo "View related ideas: scrap search 'keyword' --type=ideas"
   ```

## Example Usage

For a feature idea:
```bash
scrap idea "Real-time collaboration in CLI" "Add ability for multiple users to collaborate on entries in real-time. Could use WebSocket connections and conflict resolution." --category="feature" --tags="collaboration,realtime,websocket,cli"
```

For an architecture concept:
```bash
scrap idea "Plugin system for commands" "Design a plugin architecture that allows users to extend the CLI with custom commands. Each plugin would be a Python module with defined entry points." --category="architecture" --tags="plugins,extensibility,python,cli"
```