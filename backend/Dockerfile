# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./
RUN yarn install --immutable

COPY . .
RUN yarn build

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

# Set to production to make Medusa look for compiled files
ENV NODE_ENV=production

# Copy built assets and modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa

# CRITICAL FIX: Copy the compiled JS config to the root
# This prevents the container from trying to compile the .ts file
COPY --from=builder /app/.medusa/server/medusa-config.js ./medusa-config.js

EXPOSE 9000

# Start Medusa using the compiled config
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]