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

    profileView: function (req, res) {
        res.view('user/detail');
    },

    update: function (req, res) {
        var bodyParams = req.body;
        var id = req.param('userid');

        if (bodyParams.length === 0) {
            return res.json(200, {message: "No parameters were given"});
        }

        User.update({id: id}, bodyParams).exec(function (err, user) {
            if (err) return res.json(404, "User not found");

            return res.json(200, user[0]);
        });
    },

    destroy: function (req, res) {
        User.destroy(req.param('userid')).exec(function (err, found) {
            if (err || found.length === 0) return res.json(404, "User not found");

            res.json(200, found[0]);
        });
    }
};

