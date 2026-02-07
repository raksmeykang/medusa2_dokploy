// src/modules/notification/providers/smtp-provider.ts
import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO, Logger } from "@medusajs/framework/types"
import nodemailer from "nodemailer"

export default class SmtpNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "smtp-provider"
  protected transporter_: nodemailer.Transporter
  protected config_: any

  constructor({ logger }: { logger: Logger }, options: any) {
    super()
    this.config_ = options // Stores all options, including 'from'
    this.transporter_ = nodemailer.createTransport(options.transport)
  }

  async send(notification: ProviderSendNotificationDTO): Promise<ProviderSendNotificationResultsDTO> {
    // Use the 'from' address from the env variable (passed via options)
    // Fallback to the user if no specific 'from' is provided in the notification
    const fromAddress = this.config_.from || this.config_.transport.auth.user

    const result = await this.transporter_.sendMail({
      from: fromAddress,
      to: notification.to,
      subject: (notification.data?.subject as string) || "New Notification",
      html: notification.content as string,
    })

    return { id: result.messageId }
  }
}