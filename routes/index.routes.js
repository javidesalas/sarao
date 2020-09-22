const express = require('express')
const router = express.Router()
const User = require("../models/user.model")
const Event = require("../models/event.model")
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })
const actUser = require('../configs/userLocals.config')


router.get('/', isLoggedIn,actUser, (req, res) => {
    const {activeSarao} = req.user
    Event.find({sarao: activeSarao}).sort({startDate : -1})
        .populate('sarao')
        .then(events => res.render('index', {events}))
        .catch(err => next(err))
})


router.get('/ranking', isLoggedIn, actUser,  (req, res, next) => {
    User.find().sort({ karma: -1 })
        .then(karmaUser => res.render('ranking', { karmaUser }))
        .catch(err => next(err))
})

module.exports = router