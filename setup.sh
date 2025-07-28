#!/bin/bash

# Scrapbook MD Setup Script
# This script sets up the virtual environment and creates a wrapper script

set -e

echo "Setting up Scrapbook MD..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install
echo "Installing dependencies..."
source venv/bin/activate
pip install -e .

# Create the wrapper script
echo "Creating scrap wrapper script..."
cat > scrap << 'EOF'
#!/bin/bash
# Scrapbook MD Wrapper Script
# This script handles the virtual environment activation automatically

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Please run setup.sh first."
    exit 1
fi

source venv/bin/activate
exec python -m cli.cli "$@"
EOF

# Make the wrapper script executable
chmod +x scrap

echo "Setup complete!"
echo ""
echo "You can now use the scrap command directly:"
echo "   ./scrap --help"
echo "   ./scrap idea \"My Idea\" \"Description here\""
echo ""
echo "Tip: Add this directory to your PATH to use 'scrap' from anywhere:"
echo "   export PATH=\"\$(pwd):\$PATH\""
echo ""
