# ... (Build Stage remains the same)

# 2. Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy all node_modules (required for binaries)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# COPY THE ENTIRE .medusa FOLDER
# This includes /server and /admin automatically
COPY --from=builder /app/.medusa ./.medusa

# COPY THE CONFIG FILE AS .ts 
# Medusa v2 can read the .ts file in production
COPY --from=builder /app/medusa-config.ts ./ 

EXPOSE 9000

# Use npx to run the commands from the local node_modules
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]