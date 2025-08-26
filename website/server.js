const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to generated manifest JSON (used by multiple handlers)
// We keep a copy outside of `src` so we can update it without triggering the
// Docusaurus dev server rebuild (which watches `src/*`). The canonical file
// used by the generator remains `src/data/todoManifest.json`, but the server
// will serve and patch an alternate copy at `website/data/todoManifest.json`.
const srcManifestPath = path.join(__dirname, 'src', 'data', 'todoManifest.json');
const altDataDir = path.join(__dirname, 'data');
if (!fs.existsSync(altDataDir)) {
  fs.mkdirSync(altDataDir, { recursive: true });
}
const altManifestPath = path.join(altDataDir, 'todoManifest.json');

// In-memory manifest used to serve runtime requests (avoids fs reads on every request)
let manifest = null;

// Load manifest into memory at startup: prefer the alternate file if present,
// otherwise fall back to the src manifest and write a copy to the alternate path.
try {
  if (fs.existsSync(altManifestPath)) {
    manifest = JSON.parse(fs.readFileSync(altManifestPath, 'utf8'));
    console.log('Loaded manifest from alternate path');
  } else if (fs.existsSync(srcManifestPath)) {
    manifest = JSON.parse(fs.readFileSync(srcManifestPath, 'utf8'));
    fs.writeFileSync(altManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Copied src manifest to alternate path');
  } else {
    manifest = { items: [], generated: new Date().toISOString() };
    fs.writeFileSync(altManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Initialized empty alternate manifest');
  }
} catch (err) {
  console.error('Failed to initialize manifest in memory:', err && err.message ? err.message : err);
  manifest = { items: [], generated: new Date().toISOString() };
}

// Debounced full regeneration timer id
let regenTimer = null;
const scheduleFullRegen = (delayMs = 10000) => {
  // In development we avoid triggering the full generator to prevent the
  // Docusaurus dev server from rebuilding and re-baking the manifest into the
  // client bundle. The server will still update the alternate manifest that
  // the frontend fetches at runtime.
  if (process.env.NODE_ENV === 'development') {
    if (regenTimer) clearTimeout(regenTimer);
    console.log('Skipping full manifest regeneration in development');
    return;
  }

  if (regenTimer) clearTimeout(regenTimer);
  regenTimer = setTimeout(() => {
    try {
      const { spawn } = require('child_process');
      const child = spawn(process.execPath, ['scripts/generate-todo-manifest.js'], {
        cwd: __dirname,
        stdio: 'ignore',
        detached: true
      });
      child.unref();
      console.log('Triggered debounced async manifest regeneration');
    } catch (error) {
      console.error('Failed to trigger manifest regeneration:', error && error.message ? error.message : error);
    }
  }, delayMs);
};

// Expose manifest via HTTP so the frontend can fetch it at runtime instead of
// statically importing it (this prevents the Docusaurus dev server from
// hot-reloading the whole page when the manifest file changes).
app.get('/todo-manifest', (req, res) => {
  try {
    // Serve the in-memory manifest if available (fast), otherwise read the
    // alternate manifest file from disk.
    if (manifest) {
      return res.json(manifest);
    }
    if (fs.existsSync(altManifestPath)) {
      const onDisk = JSON.parse(fs.readFileSync(altManifestPath, 'utf8'));
      return res.json(onDisk);
    }
    return res.status(404).json({ message: 'Manifest not found' });
  } catch (err) {
    console.error('Failed to read manifest:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Failed to read manifest' });
  }
});

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

    // Load the src manifest to get the actual filename (don't overwrite the
    // in-memory `manifest` variable yet; we'll patch that in-place below).
    const srcManifestPathLocal = path.join(__dirname, 'src', 'data', 'todoManifest.json');
    if (!fs.existsSync(srcManifestPathLocal)) {
      return res.status(500).json({ message: 'TODO manifest not found' });
    }

    const srcManifest = JSON.parse(fs.readFileSync(srcManifestPathLocal, 'utf8'));
    const todoItem = srcManifest.items.find(item => item.id === todoId);
    
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
    console.log(`Updated TODO ${todoId} status to ${newStatus}`);

    // Patch the manifest in-memory so the dev frontend sees the update immediately
    try {
      if (!manifest || !manifest.items) {
        // If for some reason the in-memory manifest isn't initialized, try to
        // load the alternate file first.
        if (fs.existsSync(altManifestPath)) {
          manifest = JSON.parse(fs.readFileSync(altManifestPath, 'utf8'));
        } else {
          // Fall back to the src manifest
          manifest = srcManifest;
        }
      }

      const manifestItem = manifest.items.find(item => item.id === todoId);
      if (manifestItem) {
        manifestItem.status = newStatus;
        manifest.generated = new Date().toISOString();
        fs.writeFileSync(altManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
        console.log('Patched alternate todoManifest.json (no dev reload)');
      } else {
        // If the item isn't in the in-memory manifest, update srcManifest and
        // replace the in-memory copy so /todo-manifest stays authoritative.
        const srcItem = srcManifest.items.find(item => item.id === todoId);
        if (srcItem) srcItem.status = newStatus;
        srcManifest.generated = new Date().toISOString();
        manifest = srcManifest;
        fs.writeFileSync(altManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
        console.log('Patched alternate todoManifest.json from srcManifest fallback');
      }
    } catch (err) {
      console.error('Failed to patch alternate manifest:', err && err.message ? err.message : err);
    }

      // Debounce the full generator so the dev server isn't hit repeatedly; the
      // real src manifest will be regenerated after a short quiet period.
      scheduleFullRegen(10000);

    res.json({ 
      success: true, 
      todoId, 
      newStatus,
      message: `TODO ${todoId} updated to ${newStatus}`,
      path: todoPath
    });

  } catch (error) {
    console.error('Error updating TODO:', error);
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
  console.log(`TODO update server running on http://localhost:${PORT}`);
  console.log(`Ready to handle kanban drag updates`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down TODO update server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Shutting down TODO update server...');
  process.exit(0);
});