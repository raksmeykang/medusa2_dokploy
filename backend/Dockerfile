# STAGE 1: Build (The name 'builder' is defined here)
FROM node:20-alpine AS builder
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Enable Corepack for Yarn 4
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy package files
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --immutable

# Copy source and build
COPY . .
RUN npx medusa build --admin
RUN yarn build

# STAGE 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy the server files to the root
COPY --from=builder /app/.medusa/server ./

# Copy the admin files to the location Medusa expects
COPY --from=builder /app/.medusa/admin ./admin

# Copy the compiled config specifically
COPY --from=builder /app/.medusa/server/medusa-config.js ./medusa-config.js

EXPOSE 9000

# Run migrations and start the server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]