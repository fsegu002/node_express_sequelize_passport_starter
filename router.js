const router = require('express').Router()
const User = require('./models').User
const passport = require('passport')
const jwt = require('jsonwebtoken')

const Signup = require('./controllers/AuthController').signup
const Signin = require('./controllers/AuthController').signin
const EditUser = require('./controllers/UserController').edit
const IndexUser = require('./controllers/UserController').index
const ShowUser = require('./controllers/UserController').show

const noSession = { session: false }

router.post('/signup', Signup)

router.post('/signin', Signin)

// TODO implement logout

router.get('/user', passport.authenticate('jwt', noSession), IndexUser)

router.get('/user/:id', passport.authenticate('jwt', noSession), ShowUser)

router.put('/user/:id', passport.authenticate('jwt', noSession), EditUser)



module.exports = router