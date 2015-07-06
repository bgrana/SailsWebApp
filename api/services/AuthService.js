var passport = require('passport')
  , Strategy = require('passport-local').Strategy;


passport.use(new Strategy(function (username, password, next) {
  var criteria = {
    or: [{ username: username }, { email: username }]
  };

  User.findOne(criteria, function (error, user) {

    if (error || !user) {
      return next(null, false);
    }

    user.checkPassword(password, function (error, result) {

      if (error || !result) {
        return next(null, false);
      }

      return next(null, user);

    });

  });

}));

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  User.findOne(id, next);
});

module.exports = passport;
