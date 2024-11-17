const defaultRouter = require('../routes/default.js')
const flightsRouter = require('../routes/flights.js')

module.exports = (app) => {
    app.use('/', defaultRouter)
    app.use('/flights', flightsRouter)
}