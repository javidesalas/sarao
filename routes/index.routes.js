const express = require('express')
const router = express.Router()
const User = require("../models/user.model")
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })

const User = require('../models/user.model')
const actUser = require('../configs/userLocals.config')

router.get('/',actUser, (req, res) => res.render('index'))

router.get('/ranking',actUser, isLoggedIn, (req, res, next) => {


    User.find()
        .then(karmaUser => res.render('ranking', { karmaUser }))
        .catch(err => next(err))
})

module.exports = router