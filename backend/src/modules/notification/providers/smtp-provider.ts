// src/modules/notification/providers/smtp-provider.ts
import { 
  AbstractNotificationProviderService, 
} from "@medusajs/framework/utils"
import { 
  ProviderSendNotificationDTO, 
  ProviderSendNotificationResultsDTO,
  Logger 
} from "@medusajs/framework/types"
import nodemailer from "nodemailer"

class SmtpNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "smtp-provider"
  protected transporter_: nodemailer.Transporter
  protected config_: any

 constructor({ logger }: { logger: Logger }, options: any) {
  super()
  this.config_ = options // Options contains 'from' and 'transport'
  this.transporter_ = nodemailer.createTransport({
    ...options.transport,
    // Add this to ensure Gmail/SSL works on port 465
    secure: options.transport.port === 465 
  })
}
  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
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

// THIS IS THE MISSING PIECE
export const services = [SmtpNotificationProviderService]