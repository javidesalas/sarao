const express = require('express')
const router = express.Router()

const Sarao = require('../models/sarao.model')

router.get('/show', (req, res) => res.render('sarao/saraos'))

router.get('/new', (req,res) => res.render('sarao/new-sarao'))

router.post('/new', (req, res) => {
    const {name, startDate, endDate, prize, punishment} = req.body
    Sarao.create({name, startDate, endDate, prize, punishment} )
        .then(() => res.redirect('/'))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
})

router.get('/edit/:id', (req, res) => {
    const saraoId = req.params.id 

    Sarao.findById(saraoId)
        .then(sarao => res.render('sarao/edit-sarao', sarao))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
})

router.post('/edit/:id', (req, res) => {
    const saraoId = req.params.id 
    const {name, startDate, endDate, prize, punishment} = req.body

    Sarao.findByIdAndUpdate(saraoId,{name, startDate, endDate, prize, punishment})
        .then(() => res.redirect('/sarao/show'))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
})

module.exports = router