const defaultRouter = require('../routes/default.js')

module.exports = (app) => {
    app.use('/', defaultRouter)
}