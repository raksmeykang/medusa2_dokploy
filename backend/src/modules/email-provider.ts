import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import nodemailer from "nodemailer"

// Define the shape of our settings to satisfy TypeScript
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

export default class EmailProviderService extends AbstractNotificationProviderService {
  static identifier = "email-nodemailer"
  protected transporter: any
  protected config: SMTPProviderOptions

  constructor(container: any, options: SMTPProviderOptions) {
    // We use @ts-ignore because the base class constructor 
    // signature can sometimes conflict in the v2 framework
    // @ts-ignore
    super(container, options)
    
    // Assign options to a local 'config' property to fix the build error
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
    // This method is called by Medusa's Notification Module
    return await this.transporter.sendMail({
      from: this.config.from,
      to: notification.to,
      subject: notification.data?.subject || "Notification from Nokor24",
      // Map Medusa's notification content to the email body
      text: notification.data?.message || "",
      html: notification.data?.html || `<p>${notification.data?.message}</p>`,
    })
  }
}