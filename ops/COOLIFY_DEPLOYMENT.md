# Coolify Deployment Guide

This guide explains how to deploy the Receipt/Warranty Tracking App on Coolify platform.

## Quick Start for Coolify

1. **Fork/Clone this repository to your GitHub account**
2. **Create a new project in Coolify** at coolify.dpmob.com
3. **Connect your GitHub repository**
4. **Use docker-compose.prod.yml** as the compose file
5. **Set the required environment variables** (see below)
6. **Deploy!**

## Required Environment Variables

Set these in Coolify's environment variables section:

```bash
# Database (Coolify can provide managed PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/receipt_tracker

# Redis (Coolify can provide managed Redis)
REDIS_URL=redis://host:port

# JWT Security (Generate secure keys!)
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Email (Use SendGrid, Mailgun, etc.)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# CORS (Set to your domain)
CORS_ORIGINS=https://yourdomain.com

# Frontend API URL
VITE_API_URL=https://api.yourdomain.com
```

## Services Deployed

- **Frontend**: React app on port 3000
- **Backend**: Node.js API on port 5000  
- **Worker**: Background job processor
- **PostgreSQL**: Database (can use Coolify managed service)
- **Redis**: Cache and queues (can use Coolify managed service)

## Health Checks Included

All services have proper health checks configured for Coolify monitoring.

For full deployment details, see the complete guide in this file.
