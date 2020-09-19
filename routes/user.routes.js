const express = require("express")
const router = express.Router()

const User = require("../models/user.model")



// render de vista de perfil
router.get("/profile", (req, res) => res.render("user/profile"))



//render de vista editar user
router.get('/edit', (req, res) => res.render('user/edit-user'))

//enviar form edit user y redirect a profile
router.post('/edit', (req, res, next) => {

    const { username } = req.body


    User.findOneAndUpdate({ username })
        .then(() => res.redirect('/user/profile'))
        .catch(err => next(err))
})





// //Form add friend
// router.post('/profile', (req, res, next) => {

//     const { friends } = req.body

//     User.findOneAndUpdate({ friends })
//         .then(() => res.redirect('user/profile'))
//         .catch(err => next(err))
// })




module.exports = router