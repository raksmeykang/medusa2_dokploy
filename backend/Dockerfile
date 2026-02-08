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

# Copy source code and build
COPY . .
RUN yarn build

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy only the server build (ignores the admin build)
COPY --from=builder /app/.medusa/server ./

# Copy the config file specifically
COPY --from=builder /app/medusa-config.ts ./

EXPOSE 9000

# Run migrations and start the server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]