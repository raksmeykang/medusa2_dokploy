import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

export default class SmtpNotificationService extends AbstractNotificationProviderService {
  static identifier = "smtp-notification"
  protected transporter: nodemailer.Transporter

  constructor() {
    super()
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async send(notification: any): Promise<any> {
    return await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: notification.to,
      subject: notification.template || "Notification",
      html: notification.content.html || notification.content.text || "",
    })
  }
}
