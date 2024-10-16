// File: models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    listing_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
    },
    start_date: Date,
    end_date: Date,
    client_name: String,
    client_email: String,
    client_daytime_phone: String,
    client_mobile_phone: String,
    postal_address: String,
    home_address: String,
});

module.exports = mongoose.model('Booking', BookingSchema);
