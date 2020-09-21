const express = require('express')
const router = express.Router()
const User = require("../models/user.model")
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })

router.get('/', (req, res) => res.render('index'))
router.get('/ranking', isLoggedIn, (req, res, next) => {


    User.find()
        .then(karmaUser => res.render('ranking', { karmaUser }))
        .catch(err => next(err))
})

module.exports = router