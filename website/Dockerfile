# Multi-stage Dockerfile for Scrapbook Docusaurus site

# Development stage
FROM node:18-alpine AS development
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Make the startup script executable
RUN chmod +x start-dev.sh

# Expose development ports
EXPOSE 3000 3001

# Default development command
CMD ["./start-dev.sh"]

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the site
RUN npm run build

# Production stage
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built site from builder stage
COPY --from=builder /app/build .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for docs symlink
RUN mkdir -p /app/docs

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]