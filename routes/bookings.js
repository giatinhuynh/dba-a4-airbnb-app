// File: routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
