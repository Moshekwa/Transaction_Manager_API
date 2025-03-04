FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server to serve the built files
FROM node:18-alpine AS serve

WORKDIR /app

# Install `serve` to serve static files
RUN npm install -g serve

# Copy build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]