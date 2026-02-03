import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

export default class MyNotificationProvider extends AbstractNotificationProviderService {
    static identifier = "gmail-smtp"
    protected transporter: any
    protected config: any

    constructor(container: any, options: any) {
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
            text: notification.data?.message || "New message from Nokor24",
            html: notification.data?.html || `<p>${notification.data?.message}</p>`,
        })
    }
}