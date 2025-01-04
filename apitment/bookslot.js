const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/logusers';

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define user schema
const userSchema = new mongoose.Schema({
  slotSttime: { type: Date, required: true },  // Start time of the slot
  slotEndtime: { type: Date, required: true }  // End time of the slot
});

// Create a User model
const Users = mongoose.model('Users', userSchema);

// Define slottiming function to calculate and store the slot
const slottiming = async (req, res, next) => {
  try {
    const { slotSttime } = req.body;  // Extract slot start time from request body

    // Validate if slotSttime is provided
    if (!slotSttime) {
      return res.status(400).json({ error: 'Slot start time is required' });
    }

    // Convert slotSttime to a Date object
    const startTime = new Date(slotSttime);

    // Calculate the slotEndtime (30 minutes after slotSttime)
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutes in milliseconds

    // Log the slot start and end times for debugging purposes
    console.log('Slot Start Time:', startTime.toISOString());
    console.log('Slot End Time:', endTime.toISOString());

    // Create a new User document with the calculated slot times
    const user = new Users({
      slotSttime: startTime,
      slotEndtime: endTime
    });

    // Save the User to the database
    await user.save();

    // Respond with a success message and the saved user
    res.status(201).json({ message: 'Slot booked successfully', user });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the function to use it in your routes
module.exports = slottiming;
