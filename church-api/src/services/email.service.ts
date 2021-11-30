import {bind, BindingScope} from '@loopback/core';
import {createTransport} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {environment} from '../environments/environment';
import {EmailTemplateModel, UserModel} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  /**
   * If using gmail see https://nodemailer.com/usage/using-gmail/
   */
  private static async setupTransporter() {
    return createTransport({
      host: environment.host,
      port: environment.port,
      secure: environment.secure, // upgrade later with STARTTLS
      auth: {
        user: environment.user,
        pass: environment.pass,
      },
    });
  }
  async sendResetPasswordMail(user: UserModel): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplateModel({
      to: user.email,
      subject: '[Church App] Reset Password Request',
      html: `
      <div>
          <p>Hi there,</p>
          <p style="color: red;">We received a request to reset the password for your account</p>
          <p>To reset your password click on the link provided below</p>
          <a href="${environment.applicationUrl}/reset-password-finish.html?resetKey=${user.resetKey}">Reset your password link</a>
          <p>If you didn’t request to reset your password, please ignore this email or reset your password to protect your account.</p>
          <p>Thanks</p>
          <p>Church App Team</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }
}
