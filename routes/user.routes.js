const express = require("express")
const router = express.Router()

const User = require("../models/user.model")
const Event = require('../models/event.model')
const { populate } = require("../models/user.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión para continuar' })



// render de vista de perfil
router.get("/profile", isLoggedIn, (req, res, next) => {

    const userId = req.user.id
    const queryEvent = { $or: [{ userPlus: { $in: [userId] } }, { userMinus: { $in: [userId] } }] }
    let userEvent

    Event.find(queryEvent)    // Traemos a profile los eventos que está involucrados el usuario activo. Pendiente traer los saraos que estan activos
        .populate('userPlus')
        .populate('userMinus')
        .then(eventFound => userEvent = eventFound)
        .catch(err => next(err))


    User.findById(userId)
        .populate('friends')
        .then(dataUser => { console.log(dataUser, userEvent), res.render('user/profile', { dataUser, userEvent }) })
        .catch(err => next(err))
})




//render de vista editar user
router.get('/edit', isLoggedIn, (req, res) => res.render('user/edit-user'))

//enviar form edit user y redirect a profile
router.post('/edit', (req, res, next) => {

    const { username } = req.body


    User.findOneAndUpdate({ username })
        .then(() => res.redirect('/user/profile'))
        .catch(err => next(err))
})





//Form add friend

router.get('/addfriend', isLoggedIn, (req, res) => {


    User.find({})
        .then(allUser => res.render('user/add-friends', { allUser }))
        .catch(err => next(err))
})
router.post('/addfriend', (req, res, next) => {
    let userFriends = req.user.friends
    const userId = req.user.id
    console.log(userFriends)
    const newFriend = req.query.id
    userFriends.push(newFriend)


    User.findByIdAndUpdate(userId, { friends: userFriends })
        .then(() => res.redirect('/user/addfriend'))
        .catch(err => next(err))
})





module.exports = router