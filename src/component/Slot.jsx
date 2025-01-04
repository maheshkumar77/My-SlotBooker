import React, { useState } from 'react';
import axios from 'axios';

const BookSlot = () => {
  const [slotSttime, setSlotSttime] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/bookslot', { slotSttime });
      setResponseMessage('Slot booked successfully!');
    } catch (error) {
      setResponseMessage('Error booking the slot!');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={slotSttime}
            onChange={(e) => setSlotSttime(e.target.value)}
          />
        </label>
        <button type="submit">Book Slot</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default BookSlot;
