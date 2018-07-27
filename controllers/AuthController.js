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
    // check for password validity before querying the db
    
    // password can't be the same as newPassword
    if(password === newPassword){
      return res.status(400).json({ message: 'New password can\' be the same as current password'})
    }
    // newPassword should match confirmNewPassword
    if(newPassword !== confirmNewPassword){
      return res.status(400).json({ message: 'New password didn\'t match confirmation'})
    }

    User
    .findById(userFromToken.id)
    .then(user => { 
      // compare current passwords with password provided    
      bcrypt.compare(password, user.dataValues.password)
      .then((response) => {
        if(!response){
          return outerRes.status(400).json({ message: 'Password didn\'t match'})
        }
      })
      .catch((err) => {
        console.log('there was an error')
        return res.status(400).json(err)
      })
      // hash new password and store it
      bcrypt.hash(newPassword, saltRounds)
      .then((hash) => {
        user.update({ password: hash })
        return res.status(200).json(newUser)
      })
      .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
  }
}