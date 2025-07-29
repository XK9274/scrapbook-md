const fs = require('fs');
const path = require('path');

const TODO_DIR = path.join(__dirname, '../docs/todos');
const OUTPUT_FILE = path.join(__dirname, '../src/data/todoManifest.json');

function parseFrontmatter(content) {
  const parts = content.split('---');
  if (parts.length < 3) return null;
  
  try {
    const frontmatterText = parts[1];
    const body = parts.slice(2).join('---');
    
    // Simple YAML parser for basic key-value pairs
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    let currentKey = null;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      if (trimmed.startsWith('- ')) {
        // Handle array values
        if (currentKey && Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey].push(trimmed.substring(2));
        }
      } else if (trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        
        if (key === 'tags') {
          frontmatter[key] = [];
          currentKey = key;
        } else {
          // Remove quotes if present
          frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
          currentKey = key;
        }
      }
    }
    
    // Extract title from first heading in body if not in frontmatter
    let title = frontmatter.title || '';
    if (!title) {
      const titleMatch = body.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1];
      }
    }
    
    return {
      ...frontmatter,
      title: title || ''
    };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
}

function generateTodoManifest() {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Read all markdown files from todos directory
    const files = fs.readdirSync(TODO_DIR)
      .filter(file => file.endsWith('.md'))
      .filter(file => !file.startsWith('_')); // Exclude category files
    
    const todoItems = [];
    
    for (const filename of files) {
      const filePath = path.join(TODO_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const metadata = parseFrontmatter(content);
      
      if (metadata) {
        todoItems.push({
          filename: filename,
          title: metadata.title || filename.replace('.md', '').replace(/_/g, ' '),
          status: metadata.status || 'active',
          priority: metadata.priority || 'medium',
          tags: metadata.tags || [],
          id: metadata.id || filename.replace('.md', ''),
          date: metadata.date || '',
          context: metadata.context || ''
        });
      }
    }
    
    // Sort by priority and date
    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    todoItems.sort((a, b) => {
      const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by date if priorities are equal
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
    
    const manifest = {
      generated: new Date().toISOString(),
      count: todoItems.length,
      items: todoItems
    };
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
    console.log(`Generated TODO manifest with ${todoItems.length} items`);
    
    return manifest;
  } catch (error) {
    console.error('Error generating TODO manifest:', error);
    throw error;
  }
}

// Generate manifest
if (require.main === module) {
  generateTodoManifest();
}

module.exports = { generateTodoManifest };