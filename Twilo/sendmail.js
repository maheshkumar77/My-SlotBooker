require('dotenv').config();  // Load environment variables from .env file
const nodemailer = require('nodemailer');

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
 auth: {
    user: process.env.GMAIL_USER,  // Use the environment variable for the Gmail address
    pass: process.env.GMAIL_PASS   // Use the environment variable for the Gmail app password
  }
});

// Function to send an email
const sendMail = (email, message) => {
    const mesage=message;
  const mailOptions = {
    from: process.env.GMAIL_USER,    // Use the email from environment variables
    to: email,                        // Recipient email address
    subject: 'For your appointment alert',
    text: mesage                    // The content of the email (message)
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);  // Log the error if there's an issue
    } else {
      console.log('Email sent: ' + info.response);  // Log the success message
    }
  });
};

module.exports = sendMail;  // Export the function to be used elsewhere
