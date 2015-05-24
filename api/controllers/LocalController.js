/**
 * LocalController
 *
 * @description :: Server-side logic for managing locals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    create: function (req, res) {
        var name = req.param('name');
        var address = req.param('address');
        var location = req.param('location');
        var customForms = req.param('customForms');
        var owner = req.param('owner');
        
        Business.find({cif: owner.cif}).exec(function (err, business) {
            if (err) return res.json(404, {error: err});

            var newLocal = {
                name: name,
                address: address,
                location: location,
                customForms: customForms,
                owner: business.id
            };

            Local.create(newLocal).exec(function (err, local) {
                Local.find({id: local.id}).populate('owner').exec(function (err, populated) {
                    if (err) return res.json(400, {error: err});

                    return res.json(200, populated);
                });
            });
        });
    },

    edit: function (req, res) {
        var bodyParams = req.body;
        var id = req.param.localid;
        var updates = {};

        if (bodyParams.length > 0) {
            bodyParams.forEach(function (param) {
                updates['param'] = param;
            });

            Local.update({id: id}, updates).populate('owner').exec(function (err, local) {
                if (err) return res.json(404, {error: err});

                return res.json(200, local);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    },

    profile: function (req, res) {
        res.view('localProfile.ejs');
    },

    postComment: function (req, res) {
        var newComment = {
            user: req.param('userId'),
            local: req.params.localid,
            message: req.param('message'),
        };

        Comment.create(newComment).exec(function (err, comment) {
            Comment.find({id: comment.id}).populateAll().exec(function (err, populated) {
                if (err) return res.json(404, {error: err});

                return res.json(200, populated);
            });
        });
    }
};

