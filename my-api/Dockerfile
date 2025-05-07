# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies (use npm install if no package-lock.json exists)
RUN npm ci --only=production  

# Copy the rest of the application
COPY . .

# Set non-root user for security
RUN useradd --create-home --shell /bin/bash appuser
USER appuser

# Expose port 5000 for the backend API
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
