const router = require('express').Router()
const sequelize = require('sequelize')
const User = require('./models').User

router.get('/', (req, res) => {
  res.status(200).json({ message: 'connected' })
})

router.get('/login', (req, res) => {
  console.log('login')
  res.status(200).json({ message: 'login!'})
})

router.get('/logout', (req, res) => {
  console.log('logout')
  res.status(200).json({ message: 'logout!'})
})

router.get('/auth', (req, res) => {
  console.log('auth')
  res.status(200).json({ message: 'auth!'})
})

router.get('/user', (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch( err => res.status(400).json(err) )
})

router.post('/user', (req, res) => {
  let data = req.body
  User
    .create(data)
    .then(user => {
      return res.status(201).json(user)
    })
    .catch(err => res.status(400).json(err))
})

router.put('/user/:id', (req, res) => {
  let userId = req.params.id
  let data = req.body
  User.findById(userId)
    .then(user => {
      user.update(data).then(user => (res.status(200).json(user)))
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router