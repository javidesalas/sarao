const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Event = require('../models/event.model')
const Sarao = require('../models/sarao.model')

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })

const actUser = require('../configs/userLocals.config')

// Vista de nuevo Evento
router.get('/new', actUser, isLoggedIn, (req, res) => {
    const activeSarao = req.user.activeSarao
    //const activeUser = req.user //paso el usuario activo y el sarao activo al renderizado

    console.log(activeSarao)
    Sarao.findById(activeSarao)
        .populate('userList')
        .then(activeSarao => res.render('event/new-event', { activeSarao }))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

// Proceso de nuevo evento y return a raiz
router.post('/new', (req, res) => {
    const { name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus } = req.body
    const {owner, sarao} = req.query
    const dateString = new Date(startDate).toLocaleDateString('es-ES', { weekday: "short", year: "2-digit", month:"2-digit", day:"2-digit"})
    const timeString = new Date(startDate).toLocaleTimeString('es-ES', {hour: "2-digit", minute: "2-digit"})

    Event.create({ name, owner, sarao, image, description, startDate, dateString, timeString, duration, location, karmaPlus, karmaMinus, userPlus, userMinus })
        .then(() => res.redirect('/'))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

//Vista de detalles de los eventos
router.get('/details/:id', actUser, isLoggedIn, (req, res) => {
    const eventId = req.params.id
    const saraoId = req.user.activeSarao
    let activeSarao 
    
    Sarao.findById(saraoId)
         .populate('userList')
         .then(elm => activeSarao = elm)
         .catch(err => console.log('Waddaflurb Morty!!', err))
        
    Event.findById(eventId)
        .populate('owner')
        .populate('sarao')
        .populate('userPlus')
        .populate('userMinus')
        .then(event => {
            //creo una variable para mostrar o no el botón de edición si es el propietario (y proximamente si es admin)
            let canEdit = (event.owner.id === req.user.id) ? true : false
            caneEdit = event.finished ? false : true
            console.log(canEdit)
            res.render('event/detail', { event, activeSarao, canEdit })
        })
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

//Add me buttons
router.get('addme/:list', actUser, isLoggedIn, (req, res) => {
    const userId = req.user.id
    const eventId = req.query.id
    let list = req.params.list

    if (list === plus) {
        Event.findByIdAndUpdate(eventId, { $addToSet: { userPlus : userId } } )
                .then(() => res.redirect(`/event/details/${eventId}`))
                .catch(err => console.log('Waddaflurb Morty!!', err))
    }
    else { 
        Event.findByIdAndUpdate(eventId, { $addToSet: { userMinus : userId } } )
                .then(() => res.redirect(`/event/details/${eventId}`))
                .catch(err => console.log('Waddaflurb Morty!!', err))  
    }
})



//Vista de edit 
router.get('/edit/:id', actUser, isLoggedIn, (req, res) => {
    const eventId = req.params.id
    let activeSarao = req.user.activeSarao
    //paso el usuario activo y el sarao activo al renderizado

    Sarao.findById(activeSarao)
        .populate('userList')
        .then(sarao => activeSarao = sarao)//ojo que pasa de guardar ObjectId a objeto completo
        .catch(err => console.log('Waddaflurb Morty!!', err))

    Event.findById(eventId)
        .populate('owner')
        .populate('sarao')
        .populate('userPlus')
        .populate('userMinus')
        .then(event => res.render('event/edit-event', { event, activeSarao }))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

//Proceso de edit y return a raiz
router.post('/edit/:id', (req, res) => {
    const eventId = req.params.id
    const { name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus } = req.body

    Event.findByIdAndUpdate(eventId, { name, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus })
        .then(event => res.redirect('/'))
        .catch(err => console.log('Waddaflurb Morty!!', err))
})

router.get('/delete/:id', (req, res) => {
    const saraoId = req.params.id
    
    Event.findByIdAndDelete(saraoId)
        .then(() => res.redirect('/'))
        .catch(err => console.log('Waddaflurb Morty!!', err))


})

//Proceso de cierre de evento y return a raiz // 
router.post('/close/:id', isLoggedIn, (req, res, next) => {
    const eventId = req.params.id

    Event.findByIdAndUpdate(eventId, {finished : true})
    .then(closedEvent => {
        Promise.all([splitKarma(closedEvent.userPlus, closedEvent.karmaPlus), (splitKarma(closedEvent.userMinus, closedEvent.karmaMinus))])
        .then(elm => {
            console.log(elm)
            res.redirect('/')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
    function splitKarma (listArray, totalKarma) {
        const splitKarmaPerUser = totalKarma / listArray.length
        let queryString = buildQueryString (listArray)
    
        User.find().or(queryString)
                    .then(userArray => { 
                        return User.updateMany ( { _id: { $in: userArray} }, { $inc: { karma: splitKarmaPerUser } })
                    })
                    .then (elm => console.log(elm))   
                    .catch(err => console.log('ERRRRRROOOOOR', err))                       
    }
    function buildQueryString (array) {
        let queryString = `[`
        array.forEach( elm => {
            queryString += `{"_id": "`
            queryString += elm
            queryString += `"}, `
        })
        queryString = queryString.slice(0, -2)
        queryString += "]"
        return JSON.parse(queryString)
    }
})

module.exports = router

