# STAGE 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./
RUN yarn install --immutable

COPY . .

# Build only the backend server
RUN npx medusa build

# STAGE 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy core essentials
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa/server ./

# Copy the compiled config to root
COPY --from=builder /app/.medusa/server/medusa-config.js ./medusa-config.js

EXPOSE 9000

# Start only the backend
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]