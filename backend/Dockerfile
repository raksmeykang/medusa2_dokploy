FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock* ./

# Removed --frozen-lockfile to allow auto-sync
RUN yarn install

COPY . .
RUN yarn build
EXPOSE 9000
CMD ["yarn", "start"]