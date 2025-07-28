#!/bin/bash
# Backup script for Scrapbook MD data

set -e

# Configuration
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="scrapbook_backup_$TIMESTAMP.tar.gz"

echo "💾 Creating backup of Scrapbook data..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup archive
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    --exclude='*.tmp' \
    --exclude='*.log' \
    --exclude='node_modules' \
    --exclude='.git' \
    data/ \
    cli/ \
    website/src/ \
    website/static/ \
    *.md \
    *.yml \
    *.json \
    requirements.txt \
    pyproject.toml

echo "✅ Backup created: $BACKUP_DIR/$BACKUP_FILE"

# Show backup size
BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
echo "📊 Backup size: $BACKUP_SIZE"

# List recent backups
echo ""
echo "📋 Recent backups:"
ls -lh $BACKUP_DIR/*.tar.gz 2>/dev/null | tail -5 || echo "No previous backups found"

# Clean up old backups (keep last 10)
BACKUP_COUNT=$(ls -1 $BACKUP_DIR/*.tar.gz 2>/dev/null | wc -l)
if [ $BACKUP_COUNT -gt 10 ]; then
    echo "🧹 Cleaning up old backups (keeping last 10)..."
    ls -1t $BACKUP_DIR/*.tar.gz | tail -n +11 | xargs rm -f
fi

echo ""
echo "📖 To restore from backup:"
echo "  tar -xzf $BACKUP_DIR/$BACKUP_FILE"