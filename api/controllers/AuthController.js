/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // ACTIONS TO RENDER VIEWS

  home: function (req, res) {

    if (req.isAuthenticated()) {
      return res.view();
    }

    return res.view('user/signin');
  },

  new: function (req, res) {
    return res.view();
  },

  // ACTIONS TO PROCCESS INFO

  signUp: function (req, res) {

    User.create(req.params.all(), function (error, user) {

      if (error) {
        return res.badRequest(error);
      }

      req.login(user, function (error) {

        if (error) {
          return res.badRequest(error);
        }

        return res.ok();
      });

    });

  },

  signIn: function (req, res) {

    AuthService.authenticate('local', function(error, user) {

      if (error || !user) {
        return res.badRequest(req.__('User.SignInForm.Invalid'));
      }

      req.login(user, function(error) {

        if (error) {
          return res.badRequest(req.__('User.SignInForm.Invalid'));
        }

        return res.ok();
      });

    })(req, res);

  },

  signOut: function (req, res) {

    req.logout();

    return res.ok();
  }

};
