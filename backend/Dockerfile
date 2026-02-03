FROM node:20-alpine

WORKDIR /app/backend

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
