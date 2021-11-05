const nodemailer = require('nodemailer');
const { defaultSettings } = require('../constants/mail');
const { createActivationLink } = require('../helpers/auth/createActivationLink');

class MailService {
  static async sendActivationLink(email, activationId) {
    const link = createActivationLink(activationId);
    const transporter = nodemailer.createTransport(defaultSettings);
    const mailData = {
      from: 'Quizzy <7ice.develop@mail.ru>',
      to: `${email}`,
      subject: 'Account activation',
      html: `Перейдите по <a href="${link}">ссылке</a>, чтобы активировать аккаунт`,
    };
    await transporter.sendMail(mailData);
  }
}

module.exports = { MailService };
