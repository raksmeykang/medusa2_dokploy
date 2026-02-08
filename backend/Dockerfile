# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies required for building some Medusa modules
RUN apk add --no-cache python3 make g++

# Enable Corepack and prepare the specific Yarn version for your project
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy only the package files first to leverage Docker layer caching
COPY package.json yarn.lock* .yarnrc.yml* ./
RUN yarn install --immutable

# Copy the rest of your application code
COPY . .

# Build the Medusa project (generates the .medusa/server or dist folder)
RUN yarn build

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa/server ./

EXPOSE 9000

# The CMD runs migrations first, then starts the Medusa server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]