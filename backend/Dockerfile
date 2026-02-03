FROM node:20-alpine
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Enable Corepack and force Yarn to use the standard node_modules structure
RUN corepack enable && corepack prepare yarn@stable --activate
ENV YARN_NODE_LINKER=node-modules

# Copy package files
COPY package.json yarn.lock* ./

# Run install - the environment variable above ensures node_modules is created
RUN yarn install

# Copy the rest of the source
COPY . .

# Explicitly run the build using the local medusa-cli if necessary
RUN yarn build

EXPOSE 9000
# This version uses the "Shell form" so Docker knows how to handle the &&
CMD yarn medusa db:migrate && yarn start