// File: routes/listings.js
const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// Get filtered listings
router.get('/', async (req, res) => {
    const { location, property_type, bedrooms } = req.query;
    const query = { 'address.market': location };
    if (property_type) query.property_type = property_type;
    if (bedrooms) query.bedrooms = bedrooms;

    try {
        const listings = await Listing.find(query).limit(10); // Limit for performance
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

module.exports = router;
