"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (to, subject, body) => {
  const from = process.env.EMAIL;
  try {
    await transporter.sendMail({ from, to, subject, text: body });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
