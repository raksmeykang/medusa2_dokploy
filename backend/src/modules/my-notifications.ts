import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

export default class MyNotificationProvider extends AbstractNotificationProviderService {
    static identifier = "gmail-smtp"
    protected transporter

    constructor(container, options) {
        super(container, options)
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

    async send(notification) {
        return await this.transporter.sendMail({
            from: this.options.from,
            to: notification.to,
            subject: "You've been invited to Nokor24",
            text: `Invite Link: ${notification.data.url}`, // Simple for now
            html: `<p>Invite Link: <a href="${notification.data.url}">${notification.data.url}</a></p>`,
        })
    }
}