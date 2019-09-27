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
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log('found an existing user', existingUser);
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      console.log('creating a new user', user);
      done(null, user);

      console.log('did something?');
    }
  )
);
