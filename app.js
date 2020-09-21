require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)
// require('./configs/userLocals.config')(app)

// const userLocals = require('./configs/userLocals.config')
// app.use(userLocals)

// Routes index
require('./routes')(app)


module.exports = app
