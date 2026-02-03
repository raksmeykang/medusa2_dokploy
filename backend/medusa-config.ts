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
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            // This is the key: resolving to a local file avoids the error
            resolve: "./src/modules/email-provider", 
            id: "nodemailer",
            options: {
              channels: ["email"],
              from: process.env.SMTP_USER,
              transport: {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: process.env.SMTP_PORT === "465",
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