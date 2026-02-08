import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
  databaseUrl: process.env.DATABASE_URL,
  // Add this block to fix the SSL error
  databaseDriverOptions: {
    connection: {
      ssl: false,
    },
  },
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
    // THIS LINE FIXES THE "CANNOT GET /" ERROR
    path: "/", 
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    // Ensure the dashboard knows where the backend is
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://api.nokor24.com",
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
        redis: {
          url: process.env.REDIS_URL, // Note the nested 'redis: { url: ... }' structure
        },
      },
    },
  ],
})