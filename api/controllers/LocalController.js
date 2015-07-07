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
        var owner = req.param('owner');
        var category = req.param('category');
        var userId = req.user.id;
        console.log("OWNER: " + JSON.stringify(owner));
        
        Business.find({cif: owner.cif}).populate('owner').exec(function (err, business) {
            if (err) return res.json(404, {error: err});

            console.log("BUSINESS OWNER: " + JSON.stringify(business));
            if (userId !== owner.owner) {
                return res.json(401, {error: "User not allowed to create locals in this business"});
            }

            var newLocal = {
                name: name,
                address: address,
                location: location,
                category: category,
                owner: owner.id
            };

            Local.create(newLocal).exec(function (err, local) {
                if (err) return res.json(400, {error: err});

                return res.json(200, local);
            });
        });
    },

    update: function (req, res) {
        var bodyParams = req.body;
        var id = req.param('localid');

        if (bodyParams.length > 0) {

            Local.update({id: id}, bodyParams).exec(function (err, local) {
                if (err) return res.json(400, {error: err});

                return res.json(200, local);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    },

    getProfile: function (req, res) {
        res.view('local/profile');
    },

    destroy: function (req, res) {
        Local.destroy(req.param('localid')).exec(function (err, found) {
            if (err || found.length === 0) return res.json(404, "Local not found");

            res.json(200, found[0]);
        });
    }
};

