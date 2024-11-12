const express = require('express')
const defaultRouter = express.Router()

defaultRouter.get('/ping', async (req, res) => {
    res.send('Pong!')
})

module.exports = defaultRouter