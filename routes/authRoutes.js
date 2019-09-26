const passport = require('passport');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  // Simple call to just display the current logged in user.
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout(); // this function comes from passport middleware
    res.send(req.user);
  });
};
