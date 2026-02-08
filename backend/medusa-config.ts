import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    // If you use a dedicated domain like admin.nokor24.com, set path to "/"
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: [
  {
    resolve: "@medusajs/medusa/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL,
    },
  },
  {
    resolve: "@medusajs/medusa/workflow-engine-redis",
    options: {
      // Critical fix: ensure this matches the environment variable name
      redisUrl: process.env.REDIS_URL, 
    },
  },
],
})