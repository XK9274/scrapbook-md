#!/bin/bash
# Deployment script for scrapbook-md

set -e

# Configuration
ENVIRONMENT=${1:-development}
COMPOSE_FILE="docker-compose.yml"

if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
fi

echo "🚀 Deploying scrapbook-md ($ENVIRONMENT)..."

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f $COMPOSE_FILE down 2>/dev/null || true

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f $COMPOSE_FILE up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo ""
    if [ "$ENVIRONMENT" = "production" ]; then
        echo "🌐 Production site available at: http://localhost:80"
        echo "🔧 Nginx configuration: nginx.conf"
    else
        echo "🌐 Development site available at: http://localhost:3000"
        echo "🔄 Hot reload enabled for development"
    fi
    echo ""
    echo "📊 Container status:"
    docker-compose -f $COMPOSE_FILE ps
else
    echo "❌ Deployment failed!"
    echo "📋 Container logs:"
    docker-compose -f $COMPOSE_FILE logs
    exit 1
fi

echo ""
echo "📖 Useful commands:"
echo "  View logs: docker-compose -f $COMPOSE_FILE logs -f"
echo "  Stop services: docker-compose -f $COMPOSE_FILE down"
echo "  Restart services: docker-compose -f $COMPOSE_FILE restart"