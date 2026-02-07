import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Database connection using Dokploy's internal hostname
    databaseUrl: process.env.DATABASE_URL,
    
    // Forces IPv4 for Docker internal networking to prevent Redis timeouts
    redisUrl: process.env.REDIS_URL + "?family=0", 
    
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    
    // Explicitly disables SSL to match Dokploy's Postgres configuration
    databaseDriverOptions: { 
      connection: { 
        ssl: false 
      } 
    },
  },
  
  // Explicitly tell Medusa to skip serving the Admin panel from this container
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  
  modules: [
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL + "?family=0",
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          redisUrl: process.env.REDIS_URL + "?family=0",
        },
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            // Pointing to your local provider file shown in your screenshot
            resolve: "./src/modules/notification/providers/smtp-provider", 
            id: "smtp",
            options: {
              channels: ["email"],
              // Sender address controlled via Dokploy Env
              from: process.env.SMTP_FROM,
              transport: {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "465"),
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASSWORD,
                },
                // Automatically set security based on the Gmail port
                secure: process.env.SMTP_PORT === "465", 
              },
            },
          },
        ],
      },
    },
  ],
})