require("dotenv").config();

const { EMAIL, PASS } = process.env;
const nodemailer = require("nodemailer");

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    let info = await transporter.sendMail({
      from: EMAIL,
      to: to,
      subject: subject,
      text: text,
    })

    console.log(`Message send: ${info.messageId}`);
    return `Message send: ${info.messageId}`;

  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

module.exports = sendEmail;