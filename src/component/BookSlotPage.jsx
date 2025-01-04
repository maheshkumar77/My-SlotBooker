import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './cssfiles/bookslot.css';
import { useEmail } from './EmailContext';

const BookSlotPage = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [booked, setBooked] = useState(false);
  const [slotEndTime, setSlotEndTime] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const { email } = useEmail(); 
  // Function to handle time slot selection
  const handleTimeSelect = (event) => {
    setSelectedTime(event.target.value);
  };

  // Function to check if user is logged in and handle the slot booking
  const handleBookSlot = async () => {
    if (!selectedTime) return; // Prevent booking if no time is selected
    if(!email){
      toast.error("Register First");
    }else{
    setLoading(true); // Set loading state to true
    const slotStTime = new Date(`2026-01-03T${selectedTime}:00`);
    const newSlotEndTime = new Date(slotStTime.getTime() + 30 * 60000); // 30 minutes after start time
    setSlotEndTime(newSlotEndTime);
    setBooked(true);

    // Booking confirmation message
    const bookingMessage = `Dear user, your slot booked successfully! From: ${selectedTime} To: ${newSlotEndTime.toLocaleTimeString()} please attend on time.`;
    setMessage(bookingMessage);

    // Send the first email (Booking details)
    await sendFirstMail(bookingMessage);

    // Set message for the user
    toast.success(`Slot booked successfully! From: ${selectedTime} To: ${newSlotEndTime.toLocaleTimeString()}`);

    // Send reminder email 7 minutes before the end time
    setTimeout(() => {
      sendLastMail();
      setBooked(false); // Reset booked state after the email reminder is sent
    }, newSlotEndTime.getTime() - new Date().getTime() - 7 * 60 * 1000); // 7 minutes before the end time

    setLoading(false); // Set loading state to false
  }
  };

  // Function to send the first email (Booking details)
  const sendFirstMail = async (message) => {
    
    try {
      const res = await axios.post('http://localhost:3000/bookmesage', { message, email });
      console.log(res.data);
      toast.info('Booking details sent to your mail.');
    } catch (error) {
      console.error('Error sending reminder email:', error);
      toast.error('Error sending mail to you.');
    }
  };

  // Function to send a last-minute email reminder
  const sendLastMail = async () => {
    try {
      const reminderMessage = 'Hurry..... Please join the appointment; if you do not join, then you missed it.Plase join. [Healthcare].';
      const res = await axios.post('http://localhost:3000/bookmesage', { message: reminderMessage, email });
      console.log(res.data);
      toast.info('Reminder email sent!');
    } catch (error) {
      console.error('Error sending reminder email:', error);
      toast.error('Error sending reminder email.');
    }
  };

  return (
    <div className='bookmain'>
      <h1>Book a Slot</h1>
      <div>
        <label>Select a time slot (between 10 AM and 8 PM):</label>
        <select onChange={handleTimeSelect} value={selectedTime || ''} disabled={booked}>
          {[...Array(11).keys()].map((index) => {
            const hour = 10 + index;
            return (
              <option key={index} value={`${hour < 10 ? '0' + hour : hour}:00`}>
                {hour < 10 ? '0' + hour : hour}:00
              </option>
            );
          })}
        </select>
      </div>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" size="large" onClick={handleBookSlot} disabled={booked || !selectedTime || loading}>
          {loading ? 'Booking...' : booked ? 'Slot Booked' : 'Book Slot'}
        </Button>
      </Stack>

      {booked && slotEndTime && (
        <div>
          <p>Slot booked from {selectedTime} to {slotEndTime.toLocaleTimeString()}</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BookSlotPage;
