import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

export default class EmailProviderService extends AbstractNotificationProviderService {
  static identifier = "email-nodemailer"
  protected transporter

  constructor(container, options) {
    super(container, options)
    this.transporter = nodemailer.createTransport(options.transport)
  }

  async send(notification) {
    return await this.transporter.sendMail({
      from: this.options.from,
      to: notification.to,
      subject: notification.data?.subject || "Notification",
      html: notification.data?.html || `<p>${notification.data?.message}</p>`,
    })
  }
}