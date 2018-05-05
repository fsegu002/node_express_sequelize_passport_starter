const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcrypt')

const User = require('./models').User

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    }, 
    function (req, email, password, cb) {
        User
          .findOne({ where: {email: email} })
          .then(user => {
            if(!user) return cb(null, false, {message: 'User doesn\' exist'})
            bcrypt.compare(password, user.password, function(err, res) {
              if(err) return err
              if (!res) {
                return cb(null, false, {message: 'Incorrect email or password.'});
              }
              delete user.dataValues.password
              return cb(null, user.dataValues, {message: 'Logged In Successfully'});
            });
          })
          .catch(err => cb(err));
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.SECRET
  },
  function (jwtPayload, cb) {
    return User.findById(jwtPayload.id)
      .then(user => {
        delete user.password
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
))