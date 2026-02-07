import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL, 
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: { 
      connection: { ssl: { rejectUnauthorized: false } } 
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: { redisUrl: process.env.REDIS_URL + "?family=0" },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: { redisUrl: process.env.REDIS_URL + "?family=0" },
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/notification/providers/smtp-provider", 
            id: "smtp",
            options: {
              channels: ["email"],
              from: process.env.SMTP_FROM,
              transport: {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "465"),
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASSWORD,
                },
              },
            },
          },
        ],
      },
    },
  ],
})