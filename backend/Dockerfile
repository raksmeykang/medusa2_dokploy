# ... (Build Stage remains the same)

# STAGE 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and package.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy the server files to the root
COPY --from=builder /app/.medusa/server ./

# CRITICAL FIX: Copy the admin files to the location Medusa expects
# Medusa looks for 'index.html' inside the 'admin' folder at the root
COPY --from=builder /app/.medusa/admin ./admin

# Copy the compiled config
COPY --from=builder /app/.medusa/server/medusa-config.js ./medusa-config.js

EXPOSE 9000

# Run migrations and start
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]