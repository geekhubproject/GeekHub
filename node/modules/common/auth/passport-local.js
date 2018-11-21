const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('../../user/schema');
const hash = require('./bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  Users.findOne({ username })
    .then(async (user) => {
      try {
        if(user){
          const verify = await hash.verifyHash(password, user.password);
          if(verify)
          {
            return done(null, user);
          }
          else{
            return done(null, false, { errors: { 'email or password': 'is invalid'}});
          }
        }
      }
      catch (e) {
        console.log(e);
        return e;
      }
    }).catch(done);
}));

