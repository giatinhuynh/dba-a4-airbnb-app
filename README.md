# Airbnb Booking Application

This project is a simple Airbnb-like booking application that allows users to browse available listings, filter them by location, property type, and number of bedrooms, and make bookings. It includes three main pages: the homepage (listing search), the booking page, and the booking confirmation page.

## Features
- Browse available listings
- Filter listings by location, property type, and number of bedrooms
- Make bookings for available properties
- View booking confirmation after successful booking

## Instructions for Markers

### 1. How to Run the Application

#### Backend Setup:
1. Make sure you have Node.js and npm installed.
2. Clone the repository and navigate to the project directory.
3. Create a `.env` file in the root of the project with the following content (adjust `MONGO_URI` to point to your MongoDB database):
    ```env
    MONGO_URI=<Your MongoDB Connection String>
    PORT=5000
    ```
4. Install the backend dependencies by running:
    ```bash
    npm install
    ```
5. Start the backend server:
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000`.

#### Frontend Setup:
1. Navigate to the `/client` folder:
    ```bash
    cd client
    ```
2. Install the frontend dependencies by running:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm start
    ```
    The frontend will run on `http://localhost:3000`.

### 2. Required Libraries

#### Backend:
The following libraries are required for the backend and will be installed via `npm install`:
- **express**: Backend framework for building APIs.
- **mongodb**: MongoDB Node.js driver for connecting to MongoDB.
- **cors**: Enable cross-origin requests.
- **body-parser**: Parse incoming request bodies in a middleware.

#### Frontend:
The following libraries are required for the frontend and will be installed via `npm install`:
- **react**: JavaScript library for building user interfaces.
- **react-bootstrap**: Bootstrap components for React.
- **react-router-dom**: Routing library for React to manage navigation.
- **axios**: Promise-based HTTP client for making API requests.

### 3. Testing the Application
1. Navigate to the homepage at `http://localhost:3000`.
2. Browse listings and apply filters by location, property type, and number of bedrooms.
3. Click on a listing to navigate to the booking page.
4. Fill in the required booking details (start date, end date, name, email, etc.).
5. Submit the booking and verify that the booking confirmation page appears.

### 4. Important Notes
- **Port Numbers**: The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`. Ensure both are running before testing the application.
- **MongoDB**: You need to provide your own MongoDB connection string in the `.env` file for storing and retrieving data. If using MongoDB Atlas, make sure to enable access to your local machine's IP address.
- **Error Handling**: If you encounter any errors during the setup, ensure that all dependencies are installed and the MongoDB connection string is correct.

### 5. Folder Structure
```
├── client
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── components
│   └── package.json
├── routes
│   ├── bookings.js
│   └── listings.js
├── server.js
├── .env
└── package.json
```

### 6. Sample .env File
```
MONGO_URI=mongodb+srv://s3962053:giatinqn123@dba-cluster.pqlyc.mongodb.net/?retryWrites=true&w=majority&appName=DBA-Cluster
PORT=5000
```

### 7. API Endpoints

#### Listings API
- **GET** `/api/listings`: Retrieve a list of available listings based on filters (location, property type, bedrooms).

#### Bookings API
- **POST** `/api/bookings`: Submit a new booking.

#### Confirmation API
- **GET** `/api/confirmation`: Retrieve booking confirmation details.

### 8. Common Issues

- **MongoDB Connection**: If you receive connection errors, ensure that your MongoDB connection string is correct and that the database allows connections from your IP address.

- **Port Conflicts**: If the port `3000` or `5000` is in use, you can change the port in the `.env` file or by modifying the start command in the respective `package.json` files.
