# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies for native modules
RUN apk add --no-cache python3 make g++

# Enable Corepack for Yarn 4
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy Yarn config and binary
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# CRITICAL: Build both the backend and the Admin UI
# This generates the .medusa/server and .medusa/admin folders
RUN yarn build

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa

EXPOSE 9000

# Run migrations and start the server
# Medusa will automatically serve the admin from .medusa/admin
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]