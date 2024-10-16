// Import Express to create a router for handling booking-related routes
const express = require('express');
const router = express.Router();

// POST route for creating a new booking
router.post('/', async (req, res) => {
    // Get the database instance from the app's locals (set in server.js)
    const db = req.app.locals.db;

    // Destructure and extract fields from the incoming request body
    const { listing_id, start_date, end_date, client_name, client_email, client_mobile_phone, postal_address, home_address } = req.body;

    // Log the request data for debugging purposes
    console.log('Received booking data:', req.body);

    // Validate that required fields are provided
    if (!listing_id || !start_date || !end_date || !client_name || !client_email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Prepare the booking data, treating 'listing_id' as a string
      const booking = {
        listing_id,  // ID of the listing being booked
        start_date,  // Start date of the booking
        end_date,    // End date of the booking
        client: {    // Client details
          name: client_name,           // Name of the client
          email: client_email,         // Email of the client
          mobile_phone: client_mobile_phone,   // Optional: Client's mobile phone number
          postal_address,              // Optional: Client's postal address
          home_address,                // Optional: Client's residential address
        },
      };

      // Insert the booking data into the 'bookings' collection in MongoDB
      const result = await db.collection('bookings').insertOne(booking);
      console.log('Booking created:', result);

      // Respond with success message and HTTP status code 201 (Created)
      res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
      // Handle any errors during the booking creation process
      console.error('Error creating booking:', err);
      res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Export the router so it can be used in the main app (server.js)
module.exports = router;
