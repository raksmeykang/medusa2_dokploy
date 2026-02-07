FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache python3 make g++
RUN corepack enable && corepack prepare yarn@stable --activate
ENV YARN_NODE_LINKER=node-modules

COPY package.json yarn.lock* ./
RUN yarn install

COPY . .

RUN yarn medusa build

EXPOSE 9000

CMD ["yarn", "medusa", "start"]