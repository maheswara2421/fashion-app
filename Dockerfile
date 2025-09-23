# File: Dockerfile
# Purpose: Multi-stage build for Vite + React (TypeScript) web app with Nginx static serving.
# Notes:
# - Builder stage uses Node 20 Alpine; Production stage uses nginx:1.27-alpine.
# - Vite env vars provided securely via BuildKit secret (id=vite_env).
# Multi-stage Dockerfile for Vite + React (TypeScript)

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (workspace-aware caching)
# Copy root manifests
COPY package*.json ./
# Copy workspace manifests needed for install resolution
COPY packages/shared/package.json packages/shared/

# Install with workspaces support. Using install (not ci) to avoid strict lock issues with workspaces.
RUN npm install --no-audit --no-fund

# Copy source and build
COPY . .

# Build with Vite using BuildKit secret to provide env vars without layering them
# Provide a secret at build time with id=vite_env that contains lines like:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...
RUN --mount=type=secret,id=vite_env,target=/run/secrets/vite_env \
    if [ -f /run/secrets/vite_env ]; then \
      cp /run/secrets/vite_env .env.production; \
    elif [ -f .env.production ]; then \
      echo "Using .env.production from build context"; \
    else \
      echo "ERROR: Provide Vite envs via BuildKit secret (id=vite_env) or include .env.production in context" && exit 1; \
    fi && \
    npm run build && \
    rm -f .env.production

# 2) Production static server (nginx)
FROM nginx:1.27-alpine AS production

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck (optional)
HEALTHCHECK CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
