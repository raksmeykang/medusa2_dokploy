FROM node:20-alpine

WORKDIR /app/backend

COPY package*.json ./

# The --verbose flag makes it print every single action
# The --foreground-scripts flag forces background tasks to show logs
RUN npm install --verbose --foreground-scripts

COPY . .

# Add a print statement before building
RUN echo "Starting Medusa Build..." && npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
