const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const User = require('./models').User

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    }, 
    function (req, email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        User
          .findOne({ where: {email: email} })
          .then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password.'});
            }
            return cb(null, user.dataValues, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECRET
},
function (jwtPayload, cb) {
  console.log('payload now')
  console.log(jwtPayload)
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return User.findById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
))