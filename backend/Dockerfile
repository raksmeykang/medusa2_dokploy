# ... (Build Stage stays the same)

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# CRITICAL FIX: Copy the compiled server files AND the config file
# Medusa v2 builds everything into .medusa/server
COPY --from=builder /app/.medusa/server ./
COPY --from=builder /app/medusa-config.js ./ 

# If you are using the admin, copy that folder too
COPY --from=builder /app/.medusa/admin ./.medusa/admin

EXPOSE 9000

# Run migrations and start
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]