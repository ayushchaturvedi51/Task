// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: "varunkate1812@gmail.com",
    pass: "ppis jpof zgtl smfh",
  },
});

export const sendMail = (
  recipientEmail: string,
  subject: string,
  message: string
) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail, // Change to recipient email
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending mail:", error);
      return false;
    }
    console.log("Email sent:", info.response);
    return true;
  });
};

module.exports = { sendMail };
