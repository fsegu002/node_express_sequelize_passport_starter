const router = require('express').Router()
const User = require('./models').User
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'connected' })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) return res.status(400).json({error: err})
    if (!user) return res.status(400).json({message: 'There is no user'})
    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err)
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, process.env.SECRET);
        return res.json({user, token});
    });
  })(req, res)
})


router.get('/logout', (req, res) => {
  console.log('logout')
  res.status(200).json({ message: 'logout!'})
})

router.get('/auth', (req, res) => {
  console.log('auth')
  res.status(200).json({ message: 'auth!'})
})

router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']}
  })
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