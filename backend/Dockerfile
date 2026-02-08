# STAGE 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Enable Corepack and set Yarn version
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# Copy only the files needed for installation to protect cache
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --immutable

# Copy the rest of the source code
COPY . .

# Run the build (generates .medusa/server and .medusa/admin)
RUN yarn build

# STAGE 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy the ENTIRE .medusa directory (important for server + admin)
COPY --from=builder /app/.medusa ./.medusa

# Copy the config file specifically
COPY --from=builder /app/medusa-config.ts ./

EXPOSE 9000

# Run migrations and start the server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]