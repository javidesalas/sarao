const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Event = require('../models/event.model')
const Sarao = require('../models/sarao.model')

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })


const actUser = require('../configs/userLocals.config')
const { findById } = require('../models/user.model')


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
    const owner = req.query.owner
    const sarao = req.query.sarao

    Event.create({ name, owner, sarao, image, description, startDate, duration, location, karmaPlus, karmaMinus, userPlus, userMinus })
        .then(() => res.redirect('/'))
        .catch(err => console.log('Waddaflurb Morty!!', err))

})

//Vista de detalles de los eventos
router.get('/details/:id', actUser, isLoggedIn, (req, res) => {
    const eventId = req.params.id

    Event.findById(eventId)
        .populate('owner')
        .populate('sarao')
        .populate('userPlus')
        .populate('userMinus')
        .then(event => {
            //creo una variable para mostrar o no el botón de edición si es el propietario (y proximamente si es admin)
            let canEdit
            (event.owner.id === req.user.id || req.user.role === 'admin') ? canEdit = true : canEdit = false
            res.render('event/detail', { event, canEdit })
        })
        .catch(err => console.log('Waddaflurb Morty!!', err))

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

//Proceso de cierre de evento y return a raiz // 
///////////////////////////////////////////////////////MIRAR PROMISE.ALL
router.post('/close/:id', isLoggedIn, (req, res, next) => {
    const eventId = req.params.id

<<<<<<< HEAD
    Event.findByIdAndUpdate(eventId, { finished: true })
        .then(closedEvent => {
            const kPlusPerUser = closedEvent.karmaPlus / closedEvent.userPlus.length
            const kMinusPerUser = closedEvent.karmaMinus / closedEvent.userMinus.length

            closedEvent.userPlus.forEach(elm => {
                const userId = elm
                let newUserKarma = kPlusPerUser
                User.findById(userId)
                    .then(userToEdit => {
                        console.log('PAQUITAAAAAAAAAAAAAAA', userId, userToEdit)
                        newUserKarma += userToEdit.karma
                        User.findByIdAndUpdate(userId, { karma: newUserKarma })
                    })
                    .then()
                    .catch(err => console.log('Waddaflurb Morty!!es el update de user Karmas++', err))
            });

            closedEvent.userMinus.forEach(elm => {
                const userId = elm
                let newUserKarma = kMinusPerUser
                User.findById(userId)
                    .then(userToEdit => {
                        console.log('PAQUITOOOOOOOOOOO', userId, userToEdit)
                        newUserKarma += userToEdit.karma
                        User.findByIdAndUpdate(userId, { karma: newUserKarma })
                    })
                    .then()
                    .catch(err => console.log('Waddaflurb Morty!!es el update de user KarmasMinus', err))
            });
=======
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

    Event.findByIdAndUpdate(eventId, {finished : true})
    .then(closedEvent => {
        Promise.all([splitKarma(closedEvent.userPlus, closedEvent.karmaPlus), (splitKarma(closedEvent.userMinus, closedEvent.karmaMinus))])
        .then(elm => {
            console.log(elm)
>>>>>>> 6384efe199bd2ff9595320f91504b11fcd40df59
            res.redirect('/')
        })
        .catch(err => console.log('&&&&&&&&&&&&&&&&&&', err))
    })
    .catch(err => console.log('ERRRRRROOOOOR', err))
        
        
        // Retorna un evento con un array de ids userPlus y otro userMinus
    //         const kPlusPerUser = closedEvent.karmaPlus / closedEvent.userPlus.length
    //         const kMinusPerUser = closedEvent.karmaMinus / closedEvent.userMinus.length
    //         console.log(kPlusPerUser)
    // // Iteramos el array de ids y creamos la query
    //         let queryPlusString = buildQueryString (closedEvent.userPlus)
      
    // // Hacemos un findById y nos devuelve un array de objetos con Id y Karma
    //         User.find().or(queryPlusString)
    //             .then(elmo =>  User.updateMany ( { _id: { $in: elmo} }, { $inc: { karma: kPlusPerUser } })) 
    //                                 .then (elm => console.log(elm))   
    //                                 .catch (err => console.log('!!!!!!!!!!!!!', err))  
                             
                
    //             .catch(err => console.log('&&&&&&&&&&&&&&&&&&', err))
    //     })        

    // Hacemos un updateMany con $inc + karma
             

})







        //     closedEvent.userPlus.forEach(elm => {
        //         const userId = elm
        //         let newUserKarma = kPlusPerUser
        //         User.findById(userId)
        //             .then(userToEdit => {
        //                 console.log('PAQUITAAAAAAAAAAAAAAA',userId, userToEdit)
        //                 newUserKarma += userToEdit.karma
        //                 User.findByIdAndUpdate(userId, {karma: newUserKarma})
        //             })
        //             .then()
        //             .catch(err => console.log('Waddaflurb Morty!!es el update de user Karmas++', err))
        //     });

        //     closedEvent.userMinus.forEach(elm => {
        //         const userId = elm
        //         let newUserKarma = kMinusPerUser
        //         User.findById(userId)
        //             .then(userToEdit => {
        //                 console.log('PAQUITOOOOOOOOOOO',userId, userToEdit)
        //                 newUserKarma += userToEdit.karma
        //                 User.findByIdAndUpdate(userId, {karma: newUserKarma})
        //             })
        //             .then()
        //             .catch(err => console.log('Waddaflurb Morty!!es el update de user KarmasMinus', err))
        //     });
        //     res.redirect('/')         
        // })
        // .catch(err => console.log('Waddaflurb Morty!!', err))






module.exports = router

