# ... (Build Stage remains exactly the same)

# STAGE 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy EVERYTHING from the builder's node_modules to ensure all internal links work
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy the ENTIRE .medusa directory
COPY --from=builder /app/.medusa ./.medusa

# FIX: Copy the COMPILED config from the build output
# Medusa v2 compiles medusa-config.ts into .medusa/server/medusa-config.js
COPY --from=builder /app/.medusa/server/medusa-config.js ./medusa-config.js

EXPOSE 9000

# Run migrations and start the server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]