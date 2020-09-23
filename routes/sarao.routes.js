const express = require('express')
const router = express.Router()

const Sarao = require('../models/sarao.model')
const User = require('../models/user.model')

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })
const actUser = require('../configs/userLocals.config')

// Vista de listados de Saraos
router.get('/show', actUser, isLoggedIn, (req, res) => {
    userId = req.user.id
    Sarao.find({ userList: { $in: [userId] } }) //todos los saraos que tienen al usuario activo en su userList
        .populate('userList')
        .then(userSaraos => res.render('sarao/saraos', { userSaraos }))
        .catch(err => console.log('Waddaflurb Morty!!', err))

})


// Vista Nuevo Sarao
router.get('/new', actUser, isLoggedIn, (req, res) => {
    const userId = req.user.id

    User.findById(userId)
        .populate('friends')
        .then(creator => res.render('sarao/new-sarao', creator))
        .catch(err => console.log('Waddaflurb Morty!!', err))


})
// Proceso de nuevo Sarao y return a la vista raiz
router.post('/new', (req, res) => {
    let owner = req.user
    const ownerId = req.query.id
    let { name, image, startDate, endDate, location, userList, prize, punishment } = req.body
    
    const timeOptions =  { weekday: "short", year: "2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"}
    const startString = new Date(startDate).toLocaleString(undefined, timeOptions)
    const endString = new Date(endDate).toLocaleString('es-ES', timeOptions)
     
    Sarao.create({ name, owner, image, startDate, startString, endDate, endString, location, userList, prize, punishment })
        .then(saraoCreated => {
            const creatorId = saraoCreated.owner.id
            return User.findByIdAndUpdate(creatorId, {activeSarao : saraoCreated})
            })
        .then(elm =>{ 
            res.redirect('/')})
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

//Vista edit Sarao
router.get('/edit/:id', actUser, isLoggedIn, (req, res) => {
    const saraoId = req.params.id
    const userId = req.user.id
    let user

    User.findById(userId)
        .populate('friends')
        .then(elm => user = elm)
        .catch(err => console.log('Waddaflurb Morty!!', err))

    Sarao.findById(saraoId)
        .populate('userList')
        .populate('owner')
        .then(sarao => res.render('sarao/edit-sarao', {sarao, user}))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

// Proceso de edit Sarao y return a la vista de lista de Saraos
router.post('/edit/:id', (req, res) => {
    const saraoId = req.params.id
    const { name, startDate, endDate, userList,prize, punishment } = req.body
    const timeOptions =  { weekday: "short", year: "2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"}
    const startString = startDate.toLocaleString('es-ES', timeOptions)
    const endString = endDate.toLocaleString('es-ES', timeOptions)

    Sarao.findByIdAndUpdate(saraoId, { name, startDate, startString,  endDate, endString, userList, prize, punishment })
        .then(() => res.redirect('/sarao/show'))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

router.get ('/change/:id', isLoggedIn, (req, res) =>{
        const userId = req.user.id
        const saraoId = req.params.id

        User.findByIdAndUpdate(userId, {activeSarao: saraoId})
            .then(() => res.redirect('/'))
            .catch(err => console.log('Waddaflurb Morty!!', err))
        })

    

router.post('/delete/:id', isLoggedIn, (req, res) => {

    const saraoId = req.params.id


    Sarao.findByIdAndDelete(saraoId)
        .then(() => res.redirect('/sarao/show'))
        .catch(err => console.log('Waddaflurb Morty!!', err))


})

module.exports = router