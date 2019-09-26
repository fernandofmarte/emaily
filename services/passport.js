const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// This function creates the token to send to cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// This function searches using the id and returns user.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${keys.hostName}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log('found an existing user', existingUser);
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(user => {
            console.log('creating a new user', user);
            done(null, user);
          });
        }
      });

      console.log('did something?');
    }
  )
);
