# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Enable Corepack for Yarn 4
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy Yarn configuration and binary
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# CRITICAL: This builds the Backend AND the Admin Dashboard
RUN yarn build

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
# Copy config files
COPY --from=builder /app/medusa-config.js* ./
COPY --from=builder /app/medusa-config.ts* ./

EXPOSE 9000

# Start everything on Port 9000
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]