const express = require('express')
const router = express.Router()

const Sarao = require('../models/sarao.model')
const User = require('../models/user.model')

router.get('/show', (req, res) => {
    userId = req.user.id
    Sarao.find({userList: { $in: [userId]}}) //todos los saraos que tienen al usuario activo en su userList
        .populate('userList')
        .then(userSaraos => res.render('sarao/saraos', {userSaraos}))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
   
})

router.get('/new', (req,res) => {
    const userId = req.user.id

    User.findById(userId)
        .populate('friends')
        .then(creator => res.render('sarao/new-sarao', creator))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
   

})

router.post('/new', (req, res) => {
    const owner = req.query.id
    const {name, image, startDate, endDate, location, userList, prize, punishment}  = req.body
    Sarao.create({name, owner, image, startDate, endDate, location, userList, prize, punishment} )
        .then(() => res.redirect('/'))
        .catch(err => console.log ('Waddaflurb Morty!!', err))
})

router.get('/edit/:id', (req, res) => {
    const saraoId = req.params.id 

    Sarao.findById(saraoId)
        .populate('userList')
        .populate('owner')
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