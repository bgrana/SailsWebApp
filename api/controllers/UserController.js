/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    getProfile: function (req, res) {
        res.view('user/profile');
    },

    editProfile: function (req, res) {
        var bodyParams = req.body;
        var id = req.param.userid;
        var updates = {};

        if (bodyParams.length > 0) {
            bodyParams.forEach(function (param) {
                updates['param'] = param;
            });

            User.update({id: id}, updates).exec(function (err, user) {
                if (err) return res.json(404, {error: err});

                return res.json(200, user);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    }
};

