const User = require('../models').User
const passport = require('passport')

module.exports = {
  show: (req, res) => {
    const userId = req.params.id
    User
      .findById(
        userId,
        {
          attributes: { exclude: ['password']}
        }
      )
      .then(user => res.status(200).json(user))
  },
  edit: (req, res) => {
    let userId = req.params.id
    let data = req.body
    passport.authenticate('jwt', {session: false}, (err, authUser) => {
      if(err) return res.status(400).json({error: err})
      if(!authUser) return res.status(400).json({error: info})
      if(parseInt(req.params.id) !== authUser.dataValues.id) return res.status(403).json({message: 'User can only edit his/her own profile'})
      User
        .findById(
          userId,
          {
            attributes: { exclude: ['password']}
          }
        )
        .then(user => {
          user.update(data)
          return res.status(200).json(user)
        })
        .catch(err => res.status(400).json(err))
    })(req, res)
    
  },
  index: (req, res) => {
    User
      .findAll({
        attributes: { exclude: ['password']}
      })
      .then(users => {
        res.status(200).json(users)
      })
      .catch( err => res.status(400).json(err) )
  },
  delete: (req, res) => {
    let userId = req.params.id
    User
      .findById(
        userId,
        {
          attributes: { exclude: ['password']}
        }
      )
      .then(user => {
        if(!user) return res.status(404).json('User does not exist')
        user.destroy()
        return res.status(204)
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json(err)
      })
  }
}