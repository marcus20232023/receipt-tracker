# This Dockerfile tells Coolify to use Docker instead of Nixpacks
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install root dependencies  
RUN npm install

# Copy everything
COPY . .

# Set executable permissions on deploy script
RUN chmod +x ops/deploy.sh

# The actual deployment should use docker-compose.prod.yml
# This Dockerfile is just to override Nixpacks detection
CMD ["echo", "Use docker-compose.prod.yml for actual deployment"]
