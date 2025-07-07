# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm run install-all

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy frontend build
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Copy backend
COPY --from=builder /app/backend /app/backend
COPY --from=builder /app/package*.json /app/

# Install production dependencies for backend
WORKDIR /app
RUN npm ci --only=production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start both nginx and node server
CMD ["sh", "-c", "nginx && cd /app && node backend/server.js"]
