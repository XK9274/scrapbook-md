const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Status mapping
const statusMap = {
  1: 'active',           // 🔴 Todo
  2: 'active-secondary', // 🔴 Todo#2  
  3: 'in-progress',      // 🟠 In Progress
  4: 'in-progress-secondary', // 🟠 In Progress#2
  5: 'completed'         // 🟢 Done
};

// Update TODO status endpoint
app.post('/update-todo-status', (req, res) => {
  try {
    const { todoId, newColumnId } = req.body;
    
    if (!todoId || !newColumnId) {
      return res.status(400).json({ message: 'Missing todoId or newColumnId' });
    }

    const newStatus = statusMap[newColumnId];
    if (!newStatus) {
      return res.status(400).json({ message: 'Invalid column ID' });
    }

    // Load the manifest to get the actual filename
    const manifestPath = path.join(__dirname, 'src', 'data', 'todoManifest.json');
    if (!fs.existsSync(manifestPath)) {
      return res.status(500).json({ message: 'TODO manifest not found' });
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const todoItem = manifest.items.find(item => item.id === todoId);
    
    if (!todoItem) {
      return res.status(404).json({ message: `TODO not found in manifest: ${todoId}` });
    }

    // Look for TODO files using the actual filename
    const possiblePaths = [
      path.join(__dirname, 'docs', 'todos', todoItem.filename),
      path.join(__dirname, 'src', 'docs', 'todos', todoItem.filename),
      path.join(__dirname, '..', 'docs', 'todos', todoItem.filename)
    ];

    let todoPath = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        todoPath = possiblePath;
        break;
      }
    }

    if (!todoPath) {
      return res.status(404).json({ message: `TODO file not found: ${todoItem.filename}` });
    }

    // Update the TODO file
    let content = fs.readFileSync(todoPath, 'utf8');
    
    if (content.includes('status:')) {
      content = content.replace(/status:\s*[\w-]+/g, `status: ${newStatus}`);
    } else {
      // Add status to frontmatter if it doesn't exist
      content = content.replace(/^---\n/, `---\nstatus: ${newStatus}\n`);
    }
    
    fs.writeFileSync(todoPath, content);
    console.log(`✅ Updated TODO ${todoId} status to ${newStatus}`);

    // Regenerate manifest to reflect the change
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/generate-todo-manifest.js', { cwd: __dirname });
      console.log('📋 Manifest regenerated successfully');
    } catch (error) {
      console.error('❌ Failed to regenerate manifest:', error.message);
    }

    res.json({ 
      success: true, 
      todoId, 
      newStatus,
      message: `TODO ${todoId} updated to ${newStatus}`,
      path: todoPath
    });

  } catch (error) {
    console.error('❌ Error updating TODO:', error);
    res.status(500).json({ 
      message: 'Failed to update TODO', 
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TODO update server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 TODO update server running on http://localhost:${PORT}`);
  console.log(`📋 Ready to handle kanban drag updates`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down TODO update server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down TODO update server...');
  process.exit(0);
});