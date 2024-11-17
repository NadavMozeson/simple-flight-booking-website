const express = require('express')
const DatabaseManager = require('../utils/DatabaseManager')
const flightsRouter = express.Router()

/**
 * Route: GET /get/all
 * Description: Fetches all available flights from the database.
 * Input: None
 * Output: JSON object containing flight data or an error message.
 */
flightsRouter.get('/get/all', async (req, res) => {
    res.send(await DatabaseManager.getAllFlights())
})

/**
 * Route: POST /book
 * Description: Books a flight by adding a booking record to the database.
 * Input: Request body containing `flight` (flight ID), `fullName` (passenger name), and `tz` (personal ID).
 * Output: JSON object indicating success or failure of the booking operation.
 */
flightsRouter.post('/book', async (req, res) => {
    const { flight, fullName, tz } = req.body;
    res.send(await DatabaseManager.addBooking(flight, fullName, tz))
});

/**
 * Route: POST /search
 * Description: Searches for flights based on specified criteria (e.g., origin, destination).
 * Input: Request body containing search criteria as key-value pairs (e.g., `origin`, `destination`).
 * Output: JSON object containing matching flights or an error message.
 */
flightsRouter.post('/search', async (req, res) => {
    const criteria = req.body;
    const result = await DatabaseManager.searchFlights(criteria);
    res.send(result);
});

module.exports = flightsRouter