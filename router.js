const router = require('express').Router()
const User = require('./models').User
const passport = require('passport')
const jwt = require('jsonwebtoken')

const Signup = require('./controllers/AuthController').signup
const Signin = require('./controllers/AuthController').signin
const ChangePassword = require('./controllers/AuthController').changePassword

const EditUser = require('./controllers/UserController').edit
const IndexUser = require('./controllers/UserController').index
const ShowUser = require('./controllers/UserController').show
const DeleteUser = require('./controllers/UserController').delete

const noSession = { session: false }

router.post('/signup', Signup)

router.post('/signin', Signin)

router.post('/change-password', passport.authenticate('jwt', noSession), ChangePassword)

// TODO implement logout

router.get('/user', passport.authenticate('jwt', noSession), IndexUser)

router.get('/user/:id', passport.authenticate('jwt', noSession), ShowUser)

router.put('/user/:id', passport.authenticate('jwt', noSession), EditUser)

router.delete('/user/:id', passport.authenticate('jwt', noSession), DeleteUser)



module.exports = router