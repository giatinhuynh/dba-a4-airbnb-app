// Importing Mongoose to define the schema and model
const mongoose = require('mongoose');

// Define the schema for a listing, which outlines the structure of each document in the collection
const ListingSchema = new mongoose.Schema({
    // Name of the property or listing
    name: String,
    
    // A brief summary/description of the property
    summary: String,
    
    // Nested address field containing the market (city or locality)
    address: {
        market: String,  // e.g., "New York", "Paris"
    },
    
    // Type of the property (e.g., "Apartment", "House")
    property_type: String,
    
    // Number of bedrooms in the property
    bedrooms: Number,
    
    // Price per night for the property
    price: Number,
    
    // Nested field for review scores, specifically the rating score
    review_scores: {
        review_scores_rating: Number,  // Rating out of 100, for example
    },
});

// Export the Listing model, which represents the 'listings' collection in MongoDB
module.exports = mongoose.model('Listing', ListingSchema);
