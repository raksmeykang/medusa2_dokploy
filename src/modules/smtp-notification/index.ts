import SmtpNotificationService from "./service"
import { Module } from "@medusajs/framework/utils"

export default Module("smtp-notification", {
  service: SmtpNotificationService,
})
