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

  /**
   * /change-password
   * Request to change password by confirming current password and providing a new one
   * Authentication required
   */
  changePassword: (req, res, next) => {
    let originalToken = req.get('Authorization')
    let token = originalToken.split(' ')
    const userFromToken = jwt.decode(token[1])

    const saltRounds = 10
    const { password, newPassword, confirmNewPassword } = req.body
    User
    .findById(userFromToken.id)
    .then(user => {
      console.log('user')
      console.log(user.dataValues)
      let currentPasswordMatch = false
      bcrypt.compare(password, user.dataValues.password, function(err, res) {
        if(err) return err
        if(!res){
          return false
        }
        currentPasswordMatch = true
        comfirmNewPasswords()
      })
      if(!currentPasswordMatch) {
        return res.status(400).json({ message: 'Wrong password'})
      }

      
      bcrypt.hash(newPassword, saltRounds)
      .then((hash) => {
        console.log('update now')
        user.update({ password: hash })
        // delete user.dataValues.password
        return res.status(200).json(user)
      })
      .catch(err => res.status(400).json(err))

    })
    .catch(err => res.status(400).json(err))

    let endWithError = () => {
      console.log('end with errors')
      return res.status(400).json({ message: 'Wrong password'})
    }

    let comfirmNewPasswords = () => {
      if(newPassword !== confirmNewPassword) return res.status(400).json({ message: 'Password confirmation doesn\' match'})
    }

  }
}