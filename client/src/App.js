// Importing necessary components and libraries
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router for managing routes
import HomePage from './pages/HomePage'; // HomePage component
import BookingPage from './pages/BookingPage'; // BookingPage component
import ConfirmationPage from './pages/ConfirmationPage'; // ConfirmationPage component
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling

function App() {
    return (
        // Router handles the URL-based routing in the app
        <Router>
            {/* Define the routes for different pages */}
            <Routes>
                {/* Route to the HomePage component */}
                <Route path="/" element={<HomePage />} />

                {/* Dynamic route to the BookingPage, where the listing_id is passed as a URL parameter */}
                <Route path="/bookings/:listing_id" element={<BookingPage />} />

                {/* Route to the ConfirmationPage */}
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
