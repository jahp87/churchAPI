import {bind, BindingScope} from '@loopback/core';
import {createTransport} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {environment} from '../environments/environment';
import {EmailTemplate, User} from '../models';

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
  async sendResetPasswordMail(user: User): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      to: user.email,
      subject: '[BATicketera] Reiniciar contraseña',
      html: `
      <div>
          <p>Un saludo</p>
          <p style="color: red;">Le hemos enviado este correo electrónico para que renicie su contraseña</p>
          <p>Para reiniciar su contraseña utilise este código</p>
          <p> Code ${user.resetKey}</p>
          <p>Si no ha solicitado reiniciar su contraseña, por favor ignore este correo.</p>
          <p>Gracias</p>
          <p>Equipo BATicketera</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }
}
