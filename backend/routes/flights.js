const express = require('express')
const DatabaseManager = require('../utils/DatabaseManager')
const flightsRouter = express.Router()

flightsRouter.get('/get/all', async (req, res) => {
    res.send(await DatabaseManager.getAllFlights())
})

module.exports = flightsRouter