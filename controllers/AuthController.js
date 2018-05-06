const User = require('../models').User
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  /**
   * /signup
   * Signup for a new user account
   * Authentication NOT required
   */
  signup: (req, res, next) => {
    const saltRounds = 10
    const {email, password} = req.body
    bcrypt.hash(password, saltRounds)
      .then(function(hash) {
        User
          .create({ email: email, password: hash })
          .then(user => {
            delete user.dataValues.password
            return res.status(201).json(user.dataValues)
          })
          .catch(err => res.status(400).json({err}))
      });
  },
  /**
   * /signin
   * Signin into user account
   * Authentication NOT required
   */
  signin: (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) return res.status(400).json({error: err})
      if (!user) return res.status(400).json({error: info})
      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err)
          }
          const token = jwt.sign(user, process.env.SECRET)
          return res.json({user, token})
      });
    })(req, res)
  },
}