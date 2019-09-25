const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
app.get('/dope', (req, res) => {
  res.send({ this: 'is dope' });
});

passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => console.log(accessToken)
  )
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
