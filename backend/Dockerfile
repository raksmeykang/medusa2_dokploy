FROM node:20-alpine
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Enable Corepack and force Yarn to use the standard node_modules structure
RUN corepack enable && corepack prepare yarn@stable --activate
ENV YARN_NODE_LINKER=node-modules

# Copy package files
COPY package.json yarn.lock* ./

# Run install
RUN yarn install

# Copy the rest of the source
COPY . .

# Build the backend logic
RUN yarn build

EXPOSE 9000

# We removed 'medusa build' here because this instance is API-only. 
# Migrations stay because the API must ensure the DB is ready.
CMD yarn medusa db:migrate && yarn start