const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Event = require('../models/event.model')
const Sarao = require('../models/sarao.model')

router.get('/new', (req, res) => {
    const activeSarao = req.user.activeSarao
    const activeUser = req.user //paso el usuario activo y el sarao activo al renderizado

    console.log (activeSarao)
    Sarao.findById(activeSarao)
        .populate('userList')
        .then(activeSarao => res.render('event/new-event', activeSarao ))
        .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.post('/new', (req, res) => {
    const {name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus} = req.body
    const owner = req.query.owner
    const sarao = req.query.sarao

    Event.create({name, owner, sarao, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus})
        .then(() => res.redirect('/'))
        .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.get('/details/:id', (req, res) => {
    const eventId = req.params.id 
    
        Event.findById(eventId)
            .populate('owner')
            .populate('sarao')
            .populate('userPlus')
            .populate('userMinus')
            .then(event => {
                //creo una variable para mostrar o no el botón de edición si es el propietario (y proximamente si es admin)
                let canEdit 
                (event.owner.id === req.user.id) ? canEdit = true : canEdit = false
                console.log(canEdit)
                res.render('event/detail', {event, canEdit} )
            })
            .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.get('/edit/:id', (req, res) => {
    const eventId = req.params.id 
    let activeSarao = req.user.activeSarao
  //paso el usuario activo y el sarao activo al renderizado

    Sarao.findById(activeSarao)
        .populate('userList')
        .then(sarao => activeSarao = sarao)//ojo que pasa de guardar ObjectId a objeto completo
        .catch(err => console.log ('Waddaflurb Morty!!', err))

        Event.findById(eventId)
            .populate('owner')
            .populate('sarao')
            .populate('userPlus')
            .populate('userMinus')
            .then(event => res.render('event/edit-event',{event, activeSarao}))
            .catch(err => console.log ('Waddaflurb Morty!!', err))

})

router.post('/edit/:id', (req, res) => {
    const eventId = req.params.id 
    const {name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus} = req.body

    Event.findByIdAndUpdate(eventId,{name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus})
            .then(event => res.redirect('/'))
            .catch(err => console.log ('Waddaflurb Morty!!', err))
})

module.exports = router

