FROM node:20-alpine AS builder

WORKDIR /app/storefront

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .

# Build Next.js
ENV NODE_ENV=production
RUN npm run build

# Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app/storefront

ENV NODE_ENV=production

COPY --from=builder /app/storefront/public ./public
COPY --from=builder /app/storefront/.next/standalone ./
COPY --from=builder /app/storefront/.next/static ./.next/static

EXPOSE 8000

ENV PORT 8000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
