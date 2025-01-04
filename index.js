// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//  const  bcrypt=require('bcrypt');

const generateSlots =require('./apitment/chackapintment');
const sendmesage =require("./Twilo/sendmesage");
const sendmail =require("./Twilo/sendmail")
//const slottiming=require("./apitment/bookslot")
const app = express();
app.use(cors());
// Use express.json() middleware to parse incoming JSON data in POST requests
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET;
// Define a schema for users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logtime: { type: Number, default: 0 }, 
  bookslot:{type: Boolean, default:false},
  
});


const User = mongoose.model('User', userSchema);

app.get("/appointments", generateSlots);
//send sms
app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;  // Get recipient phone number and message from the request body

    // Ensure `to` and `message` are provided
    if (!to || !message) {
        return res.status(400).json({ error: 'Phone number and message are required.' });
    }

    // Call the sendmessage function to send SMS
    sendmesage(to, message)
        .then((messageSid) => {
            res.status(200).json({ success: true, messageSid });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});
//send mailfor booking slot
app.post("/bookmesage",(req,res)=>{
  const { message, email}=req.body;
  if(!email || !message){
      res.status(400).json({message:"enter mail and message"});
  }
  try{
    sendmail(email, message);
  res.status(200).json("sucessfull");
  }catch{
    res.status(500).json("error eccor in send mail");
  }
})
//sendmail to user
app.post("/sendmail", (req,res)=>{
    const { message}=req.body;
    if(!mail || !message){
        res.status(400).json({message:"enter mail and message"});
    }
    try{
      sendmail(User.email, message);
    res.status(200).json("sucessfull");
    }catch{
      res.status(500).json("error eccor in send mail");
    }
})

// POST route to sign up (create a new user)
app.post('/signup', async (req, res) => {
  try {
    console.log(req.body); // Log the request body to verify its contents
    const { name, age, email, password } = req.body;
    
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ name, age, email, password, logtime: 1 });

    // Save the new user
    await newUser.save();

    // Send a welcome email
    const message = `Hi Dear ${newUser.name}, you have successfully signed up in Healthcare. Please login to find a doctor.`;
    await sendmail(email, message);

    // Respond with success message
    res.status(201).json({
      message: 'User created successfully!',
      user: newUser,
    });

  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});


// POST route to login (check if email and password are correct)
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists by email
      const user = await User.findOne({ email,password }); // Look for a user with the provided email
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({
        message: 'Login successful',
        user: {
          name: user.name,
          email: user.email,
          logtime: user.logtime, // Assuming 'logtime' is part of the user schema
        },
      });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });

// MongoDB connection URL
const url = 'mongodb://localhost:27017/users';

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
