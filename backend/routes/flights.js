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

module.exports = flightsRouter