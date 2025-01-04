function generateSlots(req, res) {
    const slots = [];
    let currentTime = new Date();
    
    // Set the time to 00:00:00 (midnight)
    currentTime.setHours(0, 0, 0, 0);
    
    // Loop through the 24 hours and create slots with a 25-minute gap
    for (let i = 0; i < 24; i++) {
      let slotStart = new Date(currentTime);
      let slotEnd = new Date(currentTime.getTime() + 25 * 60000); // 25 minutes gap
      
      // Formatting the start and end time for each slot (HH:MM)
      let startTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let endTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      slots.push({ startTime, endTime });
      
      // Update current time to the next slot start time
      currentTime = slotEnd;
    }
  
    // Send the slots back in the response
    res.json(slots);
  }
  
  module.exports = generateSlots;
  