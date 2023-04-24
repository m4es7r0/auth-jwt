import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "auth-jwt",
      to,
      subject: `Activation account on`,
      text: "",
      html: `
        <div>
          <h1 style="color:#000">To activate your account, go to</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
