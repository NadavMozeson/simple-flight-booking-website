const express = require('express')
const DatabaseManager = require('../utils/DatabaseManager')
const flightsRouter = express.Router()

flightsRouter.get('/get/all', async (req, res) => {
    res.send(await DatabaseManager.getAllFlights())
})

flightsRouter.post('/book', async (req, res) => {
    const { flight, fullName, tz } = req.body;
    res.send(await DatabaseManager.addBooking(flight, fullName, tz))
});

flightsRouter.post('/search', async (req, res) => {
    const criteria = req.body; // Expecting { origin, destination, date }
    const result = await DatabaseManager.searchFlights(criteria);
    res.send(result);
});

module.exports = flightsRouter