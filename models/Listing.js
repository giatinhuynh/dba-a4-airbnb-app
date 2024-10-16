// File: models/Listing.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    name: String,
    summary: String,
    address: {
        market: String,
    },
    property_type: String,
    bedrooms: Number,
    price: Number,
    review_scores: {
        review_scores_rating: Number,
    },
});

module.exports = mongoose.model('Listing', ListingSchema);
