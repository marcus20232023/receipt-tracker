#!/bin/bash

# Receipt Tracker Deployment Script

set -e

echo "🚀 Receipt Tracker Deployment Script"
echo "=================================="

# Check if environment is provided
ENVIRONMENT=${1:-development}
echo "📝 Environment: $ENVIRONMENT"

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    echo "📥 Loading environment variables from .env.$ENVIRONMENT"
    export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
else
    echo "⚠️  No .env.$ENVIRONMENT file found, using system environment"
fi

# Choose compose file based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
else
    COMPOSE_FILE="docker-compose.yml"
fi

echo "📋 Using compose file: $COMPOSE_FILE"

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f $COMPOSE_FILE up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose -f $COMPOSE_FILE ps

# Run database migrations if in development
if [ "$ENVIRONMENT" = "development" ]; then
    echo "🗃️  Running database migrations..."
    docker-compose -f $COMPOSE_FILE exec server npm run db:migrate || true
fi

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost:${CLIENT_PORT:-3000}"
echo "🔧 Backend API: http://localhost:${SERVER_PORT:-5000}"
echo "❤️  Health check: http://localhost:${SERVER_PORT:-5000}/health"

# Show logs
echo ""
echo "📄 Recent logs:"
docker-compose -f $COMPOSE_FILE logs --tail=20
