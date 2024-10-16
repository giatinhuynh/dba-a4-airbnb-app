import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function ConfirmationPage() {
    // Set the document title when the component is mounted
    useEffect(() => {
        document.title = "Booking Confirmed | Airbnb Clone"; // Page tab title
    }, []);

    return (
        <Container className="text-center my-5">
            {/* Confirmation message box */}
            <div className="border p-5 rounded shadow-lg bg-light">
                {/* Success message */}
                <h1 className="display-4 text-success mb-4">Booking Confirmed!</h1>
                
                {/* Informative text */}
                <p className="lead mb-4">
                    Your booking has been successfully submitted. We look forward to hosting you!
                </p>
                
                {/* Button to return to the homepage */}
                <Button as={Link} to="/" variant="primary" className="px-5 py-2">
                    Return to Homepage
                </Button>
            </div>
        </Container>
    );
}

export default ConfirmationPage;
