#!/bin/bash
# Setup script for Scrapbook MD project

set -e

echo "🚀 Setting up Scrapbook MD..."

# Create virtual environment for Python CLI
echo "📦 Setting up Python environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Install CLI tool in development mode
pip install -e .

echo "🌐 Setting up Docusaurus website..."
cd website

# Install Node.js dependencies
if command -v npm &> /dev/null; then
    npm install
else
    echo "❌ npm not found. Please install Node.js first."
    exit 1
fi

cd ..

# Create data directory structure
echo "📁 Creating data directories..."
mkdir -p data/{ideas,prompts,todos,tags}

# Create symlink for Docusaurus
if [ ! -L "website/docs" ]; then
    ln -sf ../data website/docs
    echo "🔗 Created symlink: website/docs -> ../data"
fi

# Create initial category files
echo "📋 Creating category configuration files..."

cat > data/ideas/_category_.json << EOF
{
  "label": "Ideas",
  "position": 1,
  "collapsed": false,
  "collapsible": true
}
EOF

cat > data/prompts/_category_.json << EOF
{
  "label": "Prompts", 
  "position": 2,
  "collapsed": false,
  "collapsible": true
}
EOF

cat > data/todos/_category_.json << EOF
{
  "label": "Todos",
  "position": 3,
  "collapsed": false,
  "collapsible": true
}
EOF

cat > data/tags/_category_.json << EOF
{
  "label": "Tags",
  "position": 4,
  "collapsed": false,
  "collapsible": true
}
EOF

# Create sample content
echo "📝 Creating sample content..."
python3 -c "
import sys
sys.path.append('cli')
from cli import Config, StorageManager, ScrapEntry, EntryType, datetime

config = Config()
storage = StorageManager(config)

# Sample idea
idea = ScrapEntry(
    title='Welcome to Scrapbook',
    content='This is your first idea entry. You can add more using the CLI tool.',
    context='Getting started with the scrapbook system',
    tags=['welcome', 'getting-started'],
    entry_type=EntryType.IDEA,
    created_date=datetime.now()
)
storage.save_entry(idea)

# Sample prompt
prompt = ScrapEntry(
    title='Daily Reflection',
    content='What did I learn today? What challenges did I face? How can I improve tomorrow?',
    context='Daily productivity and learning',
    tags=['productivity', 'reflection', 'daily'],
    entry_type=EntryType.PROMPT,
    created_date=datetime.now(),
    category='productivity'
)
storage.save_entry(prompt)

# Sample todo
todo = ScrapEntry(
    title='Setup development environment',
    content='Install and configure all necessary tools for development',
    context='Project setup and configuration',
    tags=['setup', 'development', 'configuration'],
    entry_type=EntryType.TODO,
    created_date=datetime.now()
)
storage.save_entry(todo)

print('Sample content created!')
"

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Test the CLI: scrap idea 'My first idea' 'This is the content' --tags='test,cli'"
echo "2. Start the website: cd website && npm start"
echo "3. View your scrapbook at http://localhost:3000"
echo ""
echo "📖 Usage examples:"
echo "  scrap idea 'Title' 'Content' --context='Context' --tags='tag1,tag2'"
echo "  scrap prompt 'Title' 'Content' --category='development'"
echo "  scrap todo 'Title' 'Content' --priority='high'"
echo "  scrap search 'query'"
echo "  scrap list --type=idea"
echo "  scrap stats"