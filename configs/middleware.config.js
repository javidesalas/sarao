const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')



module.exports = app => {
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    //middleware para tener siempre disponible req.user en las vistas
    app.use(function (req, res, next) {
        res.locals.user = req.user
        next()
      })
}