---
sidebar_position: 3
---

# Create Idea

**Description**: Capture creative thoughts and insights with proper categorization  
**Allowed Tools**: run_in_terminal, Python CLI

## Instructions

1. **Extract idea from conversation context**
2. **Generate descriptive title**
3. **Categorize appropriately**
4. **Add relevant tags**
5. **Create idea via scrap CLI**
6. **Suggest related actions**

## Implementation Steps

1. Identify the core idea:
   - Main concept or insight
   - Context that sparked the idea
   - Potential applications or implications
   - Any supporting details

2. Generate clear, descriptive title:
   - Keep it concise but specific
   - Include key concepts
   - Make it searchable
   - Avoid generic titles

3. Choose appropriate category:
   - **feature**: New functionality ideas
   - **improvement**: Enhancements to existing systems
   - **architecture**: System design concepts
   - **research**: Areas to investigate
   - **creative**: Artistic or design concepts
   - **business**: Strategy or process ideas

4. Tag appropriately:
   - Technology stack involved
   - Project relevance
   - Implementation complexity
   - Time sensitivity

5. Create idea entry:
   ```bash
   cd /home/mattpc/HueTesting/scrapbook-md
   ./scrap idea "Idea Title" "Detailed description of the idea, including context, potential implementation approaches, and expected benefits." --category="feature" --tags="tag1,tag2,tag3"
   ```

6. Suggest follow-up actions:
   ```bash
   echo "Idea captured successfully"
   echo "Consider creating todo: ./scrap todo 'Research [idea topic]' --priority=low"
   echo "View related ideas: ./scrap search 'keyword' --type=ideas"
   ```

## Example Usage

For a feature idea:
```bash
./scrap idea "Real-time collaboration in CLI" "Add ability for multiple users to collaborate on scrapbook entries in real-time. Could use WebSocket connections and conflict resolution similar to Google Docs." --category="feature" --tags="collaboration,realtime,websocket,cli"
```

For an architecture concept:
```bash
./scrap idea "Plugin system for scrap commands" "Design a plugin architecture that allows users to extend the CLI with custom commands. Each plugin would be a Python module with defined entry points." --category="architecture" --tags="plugins,extensibility,python,cli"
```

For an improvement:
```bash
./scrap idea "Smart tag suggestions" "Use machine learning to suggest relevant tags based on entry content and user's existing tag patterns. Could analyze text similarity and tag co-occurrence." --category="improvement" --tags="ml,tags,suggestions,ux"
```

## Category Guidelines

- **feature**: New functionality that doesn't exist
- **improvement**: Making existing features better
- **architecture**: System design and structure ideas
- **research**: Topics to investigate or learn about
- **creative**: Design, UI/UX, or artistic concepts
- **business**: Process, workflow, or strategy ideas

## Quality Guidelines

- Be specific rather than vague
- Include enough context for future understanding
- Mention potential challenges or considerations
- Link to related ideas or existing work when relevant
- Consider implementation feasibility
