// Import Express to create a router for handling listing-related routes
const express = require('express');
const router = express.Router();

// GET route for retrieving filtered or random listings
router.get('/', async (req, res) => {
    // Destructure and extract query parameters from the request (location, property_type, bedrooms)
    const { location, property_type, bedrooms } = req.query;
    const query = {};  // Initialize an empty query object
    const db = req.app.locals.db;  // Get the database instance from the app's locals (set in server.js)

    // Apply location-based filtering on multiple address fields (if location is provided)
    if (location) {
        query.$or = [
            { 'address.street': { $regex: new RegExp(location, 'i') } },   // Match street
            { 'address.suburb': { $regex: new RegExp(location, 'i') } },   // Match suburb
            { 'address.government_area': { $regex: new RegExp(location, 'i') } },  // Match government area
            { 'address.market': { $regex: new RegExp(location, 'i') } },   // Match market (city)
            { 'address.country': { $regex: new RegExp(location, 'i') } },  // Match country
            { 'address.country_code': { $regex: new RegExp(location, 'i') } }  // Match country code
        ];
    }

    // Apply filtering by property type (e.g., "House", "Apartment")
    if (property_type) query['property_type'] = property_type;

    // Apply filtering by number of bedrooms (e.g., 1, 2, 3)
    if (bedrooms) query['bedrooms'] = parseInt(bedrooms);

    try {
        let listings;

        // Check if there are any filters applied (i.e., query is not empty)
        if (Object.keys(query).length > 0) {
            // If there are filters, apply them to fetch matching listings
            listings = await db.collection('listingsAndReviews').find(query).limit(10).toArray();
        } else {
            // If no filters are applied, return 10 random listings using MongoDB's $sample operator
            listings = await db.collection('listingsAndReviews').aggregate([{ $sample: { size: 10 } }]).toArray();
        }

        // Convert Decimal128 fields (used in MongoDB for high precision) to regular numbers
        const formattedListings = listings.map(listing => {
            if (listing.price && listing.price._bsontype === 'Decimal128') {
                listing.price = parseFloat(listing.price.toString());  // Convert Decimal128 to a float
            }
            return listing;
        });

        // Send the formatted listings back to the client as a JSON response
        res.json(formattedListings);
    } catch (err) {
        // Handle any errors during the listing retrieval process
        console.error('Error fetching listings:', err);
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

// Export the router so it can be mounted and used in the main app (server.js)
module.exports = router;
