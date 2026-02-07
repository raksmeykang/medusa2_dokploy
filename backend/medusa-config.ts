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
      ssl: false 
    }
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
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "medusa-notification-nodemailer", 
            id: "nodemailer",
            options: {
              channels: ["email"],
              transport: {
                host: process.env.MAIL_SMTP_HOST,
                port: parseInt(process.env.MAIL_SMTP_PORT || "465"),
                auth: {
                  user: process.env.MAIL_SMTP_USER,
                  pass: process.env.MAIL_SMTP_PASS,
                },
                tls: {
                  rejectUnauthorized: false,
                },
              },
              from: process.env.MAIL_FROM_ADDRESS,
            },
          },
        ],
      },
    },
  ],
})