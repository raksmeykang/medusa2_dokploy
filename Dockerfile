FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package and yarn lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Medusa project
RUN yarn build

EXPOSE 9000

# Start the built server
CMD ["yarn", "start"]