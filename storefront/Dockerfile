FROM node:20-alpine
WORKDIR /app

# Install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the Next.js storefront
# Note: Next.js needs the Medusa URL during build for static optimization
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

RUN yarn build

EXPOSE 8000
CMD ["yarn", "start"]