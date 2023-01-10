const nodemailer = require('nodemailer');
require('dotenv/config')

const transporter = nodemailer.createTransport({
  host: process.env.HOST_SMTP,
  port: process.env.HOST_PORTMAIL,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.HOST_PASS
  }
});

module.exports = transporter;