const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create email transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // App password from Gmail
    },
  });

  // Options for sending the email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send email
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Email sent:", info);
    }
  });
};

module.exports = sendEmail;
