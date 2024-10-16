// Importing axios for making HTTP requests
import axios from 'axios';

// Create an axios instance with a base URL pointing to the backend API
const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for backend API, change as needed in production
});

// Export the axios instance to be used in other components
export default instance;
