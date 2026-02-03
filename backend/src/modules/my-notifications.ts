import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

// Define an interface for our options to keep TypeScript happy
interface SMTPProviderOptions {
  from: string
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export default class MyNotificationProvider extends AbstractNotificationProviderService {
    static identifier = "gmail-smtp"
    protected transporter: any
    protected config: SMTPProviderOptions

    constructor(container: any, options: SMTPProviderOptions) {
        // @ts-ignore
        super(container, options)
        this.config = options
        this.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.auth.user,
                pass: options.auth.pass,
            },
        })
    }

    async send(notification: any): Promise<any> {
        return await this.transporter.sendMail({
            from: this.config.from,
            to: notification.to,
            subject: "Notification from Nokor24",
            text: notification.data?.message || "",
            html: notification.data?.html || `<p>${notification.data?.message}</p>`,
        })
    }
}