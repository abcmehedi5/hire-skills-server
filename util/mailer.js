"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
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
