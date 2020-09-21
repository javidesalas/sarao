const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const actUser = require('../configs/userLocals.config')

router.get('/',actUser, (req, res) => res.render('index'))
router.get('/ranking',actUser, (req, res) => res.render('ranking'))

module.exports = router