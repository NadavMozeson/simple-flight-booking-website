const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Load and register all routes for the application
require('./utils/listenToRoutes')(app);

// Start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully Running at http://localhost:" + PORT);
        else
            console.log("Error occurred, server can't start", error);
    });
}

// Export the app instance for testing or other uses
module.exports = app;
