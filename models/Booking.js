const mongoose = require('mongoose');

// Define the schema for bookings
const BookingSchema = new mongoose.Schema({
    listing_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the listing the booking is for
        ref: 'Listing', // References the 'Listing' collection
    },
    start_date: Date, // Start date of the booking
    end_date: Date, // End date of the booking
    client_name: String, // Name of the client making the booking
    client_email: String, // Email address of the client
    client_mobile_phone: String, // Optional mobile phone number
    postal_address: String, // Optional postal address of the client
    home_address: String, // Optional residential address of the client
});

// Export the Booking model using the BookingSchema
module.exports = mongoose.model('Booking', BookingSchema);
