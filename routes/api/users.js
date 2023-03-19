const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require('../../config/keys').secret
const User = require('../../models/User')


router.post('/register', (req, res) =>{
    let {
        Login,
        Pass,
        PassConfirm,
        Name,
        Surname,
        Email,
        Phone,
    } = req.body

    //check if password is correct
    if(Pass !== PassConfirm){
        return res.status(400).json({
            msg: "Hasła nie są identyczne."
        })
    }

    //check for unique login
    User.findOne({
        Login: Login
    }).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Użytkownik o podanym loginie już istnieje"
            })
        }
    })

    //check for unique email
    User.findOne({
        Email: Email
    }).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Użytkownik o podanym Emailu już istnieje"
            })
        }
    })

    //check for unique phone number
    User.findOne({
        Phone: Phone
    }).then(user => {
        if(user){
            return res.status(400).json({
                msg: "Użytkownik o numerze telefonu już istnieje"
            })
        }
    })


    //create user
    let newUser = new User({
        Login,
        Pass,
        Name,
        Surname,
        Email,
        Phone,
    })


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Pass, salt, (err, hash) => {
            if(err) throw err
            newUser.Pass = hash
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Rejestracja przebiegła pomyślnie."
                })
            })
        })
    })

})


router.post('/login', (req, res) =>{
    User.findOne({ Login: req.body.Login }).then( user => {
        if(!user){
            return res.status(404).json({
                msg: "Użytkownik o podanym loginie nie istnieje.",
                success: false
            })
        }

        bcrypt.compare(req.body.Pass, user.Pass).then(isMatch => {
            if(isMatch){
                //send JSON Token
                const payload = {
                    _id: user._id,
                    Login: user.Login,
                    Name: user.Name,
                    Surname: user.Surname,
                    Email: user.Email,
                    Phone: user.Phone
                }
                jwt.sign(payload, key, {
                    expiresIn : 604800 //tydzień
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: "Jesteś teraz zalogowany/a"
                    })
                }
                )
            }else{
                return res.status(404).json({
                    msg: "Nieprawidłowe hasło.",
                    success: false
                })
            }
        })
    })
})


router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    })
})


module.exports = router