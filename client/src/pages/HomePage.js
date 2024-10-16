import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

function HomePage() {
    // State variables for form inputs and listings data
    const [location, setLocation] = useState(''); // Location state
    const [propertyType, setPropertyType] = useState(''); // Property type state
    const [bedrooms, setBedrooms] = useState(''); // Bedrooms state
    const [listings, setListings] = useState([]); // Listings data state
    const [loading, setLoading] = useState(false); // Loading state for async operations
    const [error, setError] = useState(''); // Error handling state

    // Set the document title when the component mounts
    useEffect(() => {
        document.title = "Find Your Stay | Airbnb Clone"; // Set tab title
    }, []);

    // Fetch random listings when the page initially loads
    const fetchRandomListings = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/listings'); // Fetch 10 random listings without filters
            const formattedListings = response.data.map(listing => {
                if (listing.price && listing.price.$numberDecimal) {
                    listing.price = parseFloat(listing.price.$numberDecimal);
                }
                return listing;
            });
            setListings(formattedListings); // Update listings state
        } catch (error) {
            setError('Failed to fetch listings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch listings based on filters; location is mandatory
    const fetchListings = async () => {
        if (!location) {
            setError('Location is required.'); // Ensure location is provided
            return;
        }
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/listings', {
                params: {
                    location: location || undefined, // Include location filter if provided
                    property_type: propertyType || undefined, // Include property type filter
                    bedrooms: bedrooms || undefined, // Include bedrooms filter
                }
            });
            const formattedListings = response.data.map(listing => {
                if (listing.price && listing.price.$numberDecimal) {
                    listing.price = parseFloat(listing.price.$numberDecimal); // Handle price format
                }
                return listing;
            });
            setListings(formattedListings); // Update listings state
        } catch (error) {
            setError('Failed to fetch listings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission to trigger a search with the provided filters
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchListings(); // Fetch filtered listings
    };

    // Fetch random listings on initial page load
    useEffect(() => {
        fetchRandomListings();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Find Your Perfect Airbnb</h1>

            {/* Filter Form */}
            <Form onSubmit={handleSubmit} className="mb-5">
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location (mandatory):</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                placeholder="Enter location" 
                                required // Ensure location is required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formPropertyType">
                            <Form.Label>Property Type (optional):</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={propertyType} 
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value="">Any</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Loft">Loft</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formBedrooms">
                            <Form.Label>Number of Bedrooms (optional):</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={bedrooms} 
                                onChange={(e) => setBedrooms(e.target.value)}
                            >
                                <option value="">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                        {/* Submit button for search */}
                        <Button type="submit" className="btn btn-primary w-100">Search</Button>
                    </Col>
                </Row>
            </Form>

            <h2 className="mb-4">Available Listings</h2>

            {/* Show loading and error messages */}
            {loading && <p>Loading listings...</p>}
            {error && <p className="text-danger">{error}</p>}
            {listings.length === 0 && !loading && !error && <p>No listings available for the selected filters.</p>}

            {/* Display listings in a grid layout */}
            <Row>
                {listings.map((listing) => (
                    <Col key={listing._id} md={4} className="mb-4">
                        {/* Listing card with fixed height */}
                        <Card style={{ height: '550px' }}>
                            <Link to={`/bookings/${listing._id}`}>
                                <Card.Img 
                                    variant="top" 
                                    src={listing.images?.picture_url || "https://via.placeholder.com/400x300"} 
                                    alt="Property Image" 
                                    style={{ height: '200px', objectFit: 'cover' }} // Fixed image height and cover
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300"; }} // Handle broken images
                                />
                            </Link>
                            <Card.Body className="d-flex flex-column">
                                {/* Listing title */}
                                <Card.Title className="text-truncate" style={{ maxHeight: '50px' }}>
                                    <Link to={`/bookings/${listing._id}`}>{listing.name}</Link>
                                </Card.Title>
                                {/* Listing summary with limited height for overflow */}
                                <Card.Text style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100px' }}>
                                    <strong>Summary:</strong> {listing.summary}
                                </Card.Text>
                                {/* Listing details */}
                                <Card.Text style={{ height: '20px' }}>
                                    <strong>Location:</strong> {listing.address?.market}, {listing.address?.country}
                                </Card.Text>
                                <Card.Text style={{ height: '20px' }}>
                                    <strong>Price:</strong> ${listing.price ? listing.price : 'N/A'} per night
                                </Card.Text>
                                <Card.Text style={{ height: '20px' }}>
                                    <strong>Rating:</strong> {listing.review_scores?.review_scores_rating || 'N/A'} ({listing.number_of_reviews || 0} reviews)
                                </Card.Text>
                                {/* Book Now button at the bottom of the card */}
                                <div className="mt-auto">
                                    <Button variant="primary" as={Link} to={`/bookings/${listing._id}`} className="w-100">
                                        Book Now
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomePage;
