import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

function BookingPage() {
    // Get the listing ID from URL params
    const { listing_id } = useParams();
    const navigate = useNavigate();

    // Initialize state for form data
    const [formData, setFormData] = useState({
        start_date: '',         // Check-in date
        end_date: '',           // Check-out date
        client_name: '',         // User's name
        client_email: '',        // User's email
        client_daytime_phone: '',// User's daytime phone
        client_mobile_phone: '', // User's mobile phone (mandatory)
        postal_address: '',      // User's postal address
        home_address: '',        // User's residential address
    });

    // Set the document title when the component is mounted
    useEffect(() => {
        document.title = "Book Your Stay | Airbnb Clone"; // Page tab title
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        // Update form data based on the field that is being edited
        setFormData({
            ...formData,              // Keep existing form data
            [e.target.name]: e.target.value, // Update the specific field that changed
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission

        // Log the form data before submitting
        console.log('Form Data:', formData);

        try {
            // Make a POST request to submit the booking data along with the listing ID
            await axios.post('/bookings', { listing_id, ...formData });
            navigate('/confirmation'); // Redirect to the confirmation page on success
        } catch (error) {
            // Log any errors during the booking process
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center">Let's book the property</h1>
            
            {/* Booking Form */}
            <Form onSubmit={handleSubmit} className="border p-4 rounded">
                
                {/* Booking Dates */}
                <h3>Booking Details</h3>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startDate" className="mb-3">
                            <Form.Label>Check In</Form.Label>
                            <Form.Control
                                type="date"                // Date input for check-in
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required                   // Required field
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endDate" className="mb-3">
                            <Form.Label>Check Out</Form.Label>
                            <Form.Control
                                type="date"                // Date input for check-out
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required                   // Required field
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* User's Personal Information */}
                <h3>Your Details</h3>
                <Form.Group controlId="clientName" className="mb-3">
                    <Form.Label>Your Name (mandatory)</Form.Label>
                    <Form.Control
                        type="text"                      // Text input for user's name
                        placeholder="Please enter your name"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required                         // Required field
                    />
                </Form.Group>

                <Form.Group controlId="clientEmail" className="mb-3">
                    <Form.Label>Email Address (mandatory)</Form.Label>
                    <Form.Control
                        type="email"                     // Email input for user's email
                        placeholder="Please enter your email address"
                        name="client_email"
                        value={formData.client_email}
                        onChange={handleChange}
                        required                         // Required field
                    />
                </Form.Group>

                <Form.Group controlId="clientMobile" className="mb-3">
                    <Form.Label>Your Mobile No: (mandatory)</Form.Label>
                    <Form.Control
                        type="text"                      // Text input for mobile number
                        placeholder="Please enter your mobile number"
                        name="client_mobile_phone"
                        value={formData.client_mobile_phone}
                        onChange={handleChange}
                        required                         // Required field
                    />
                </Form.Group>

                <Form.Group controlId="postalAddress" className="mb-3">
                    <Form.Label>Postal Address</Form.Label>
                    <Form.Control
                        type="text"                      // Text input for postal address
                        placeholder="Please provide your postal address"
                        name="postal_address"
                        value={formData.postal_address}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="homeAddress" className="mb-3">
                    <Form.Label>Residential Address</Form.Label>
                    <Form.Control
                        type="text"                      // Text input for residential address
                        placeholder="Please provide your residential address (cannot be a PO Box)"
                        name="home_address"
                        value={formData.home_address}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                    <Button type="submit" className="btn btn-primary w-100">Book Now</Button>
                </div>
            </Form>
        </div>
    );
}

export default BookingPage;
