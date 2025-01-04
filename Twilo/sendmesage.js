require('dotenv').config();
const twilio = require('twilio');

// Initialize Twilio client
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Function to send the message
const sendmessage = (to, message) => {
    return client.messages.create({
        body: message, // The message content
        to: to, // Recipient's phone number
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    })
    .then(message => {
        console.log('Message SID:', message.sid);
        return message.sid; // Return the message SID for confirmation
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        throw error; // Throw the error to be caught in the app.js endpoint
    });
};

module.exports = sendmessage;
