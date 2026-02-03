FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++

# 1. Enable Corepack to use the correct Yarn version
RUN corepack enable

COPY package.json yarn.lock* ./

# 2. Force Yarn to use node_modules linker and install
RUN yarn config set nodeLinker node-modules && yarn install

COPY . .

# 3. Build the project
RUN yarn build

EXPOSE 9000
CMD ["yarn", "start"]