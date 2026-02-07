import { 
  AbstractNotificationProviderService, 
} from "@medusajs/framework/utils"
import { 
  ProviderSendNotificationDTO, 
  ProviderSendNotificationResultsDTO,
  Logger 
} from "@medusajs/framework/types"
import nodemailer from "nodemailer"

type InjectedDependencies = {
  logger: Logger
}

export default class SmtpNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "smtp-provider"
  protected transporter_: nodemailer.Transporter
  protected logger_: Logger

  constructor({ logger }: InjectedDependencies, options: any) {
    super()
    this.logger_ = logger
    this.transporter_ = nodemailer.createTransport(options.transport)
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    try {
      const result = await this.transporter_.sendMail({
        from: notification.from || "noreply@oxooz.com",
        to: notification.to,
        // In v2, 'template' often acts as the subject/identifier if not provided in 'data'
        subject: (notification.data?.subject as string) || "New Notification", 
        html: notification.content as string,
      })

      this.logger_.info(`Email successfully sent to ${notification.to}`)
      
      return { id: result.messageId }
    } catch (error) {
      this.logger_.error(`SMTP send error: ${error.message}`)
      throw error
    }
  }
}