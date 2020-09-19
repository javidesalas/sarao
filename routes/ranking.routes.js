const express = require('express')
const router = express.Router()

router.get('/ranking', (req, res) => res.render('ranking'))

module.exports = router