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

# Build frontend (Next.js static export)
RUN cd frontend && npm run build

# Production stage
FROM node:18-alpine AS prod

WORKDIR /app

# Copy backend
COPY --from=builder /app/backend /app/backend
COPY --from=builder /app/package*.json /app/

# Install production dependencies for backend
RUN npm ci --only=production

# Copy frontend static export (Next.js) to /usr/share/nginx/html (will be used by nginx)
COPY --from=builder /app/frontend/out /usr/share/nginx/html

# Cài đặt nginx
RUN apk add --no-cache nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Script start cả nginx và node backend
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
