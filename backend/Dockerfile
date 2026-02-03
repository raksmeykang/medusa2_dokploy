FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++

# Using a wildcard * ensures the build doesn't crash if one file is slightly misplaced
COPY package.json yarn.loc[k] ./

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 9000
CMD ["yarn", "start"]
