const express = require('express')
const defaultRouter = express.Router()

/**
 * Route: GET /ping
 * Description: Simple health check endpoint to verify that the server is running.
 * Input: None
 * Output: String response 'Pong!'
 */
defaultRouter.get('/ping', async (req, res) => {
    res.send('Pong!')
})

module.exports = defaultRouter