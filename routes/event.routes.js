const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Event = require('../models/event.model')


router.get('/new', (req, res) => {

    res.render('event/new-event')
    const {activeSarao} = req.user

    Sarao.findById(activeSarao)
        .populate('userList')
        .then(activeSarao => res.render('event/new-event', activeSarao ))
        .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.post('/new', (req, res) => {
    const {name, startDate} = req.body
    Event.create({name, startDate})
        .then(() => res.redirect('/'))
        .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.get('/details/:id', (req, res) => {
    const eventId = req.params.id 

        Event.findById(eventId)
            .then(event => res.render('event/detail',event))
            .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.get('/edit/:id', (req, res) => {
    const eventId = req.params.id 

        Event.findById(eventId)
            .then(event => res.render('event/edit-event',event))
            .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.post('/edit/:id', (req, res) => {
    const eventId = req.params.id 
    const {name, startDate} = req.body

    Event.findByIdAndUpdate(eventId,{name, startDate})
            .then(event => res.redirect('/'))
            .catch(err => console.log ('Waddaflurb Morty!!', err))
})

module.exports = router

