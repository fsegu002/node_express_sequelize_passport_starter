const User = require('../models').User
const passport = require('passport')

module.exports = {
  /**
   * /user/:id
   * Show user specified in URL
   * Authentication required
   */
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
  /**
   * /user/:id
   * Edit user specified in URL
   * User can only edit himself
   * Authentication required
   */
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
  /**
   * /user
   * List all users
   * Authentication required
   */
  index: (req, res) => {
    User
      .findAll({
        attributes: { exclude: ['password']},
        order: [['createdAt', 'ASC']]
      })
      .then(users => {
        res.status(200).json(users)
      })
      .catch( err => res.status(400).json(err) )
  },
  /**
   * /user/:id
   * Delete user specified in URL
   * Authentication required
   */
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
        if(!user) return res.status(404).json({message: 'User does not exist'})
        user.destroy()
        res.status(204)
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json(err)
      })
  }
}