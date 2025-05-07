# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app

# Set environment variable for production
ENV NODE_ENV=production

# Copy package.json and package-lock.json first to optimize caching
COPY package.json package-lock.json ./

# Install all dependencies (needed for the build step)
RUN npm ci  

# Copy the entire project files
COPY . .

# Build the React app
RUN npm run build  

# Stage 2: Use Nginx to serve the React app
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Set correct permissions for Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
