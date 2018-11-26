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
    .then(async (userData) => {
      try {
        if(userData) {
          const {password: userPassword, ...user} = {...userData.toObject()};
          const verify = await hash.verifyHash(password, userPassword);
          if (verify) return done(null, user);
          else return done(null, false, {errors: 'Invalid password'});
        }
        else return done(null, false, { errors:'User doesn\'t exist'});
      }
      catch (e) {
        console.log(e);
        return e;
      }
    }).catch(done);
}));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session id in mongo here');
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  const user = await Users.findOne({_id:id}, {password:0});
  done(null, user);
});
