/**
 * BusinessController
 *
 * @description :: Server-side logic for managing businesses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    create: function (req, res) {
        var name = req.param('name');
        var cif = req.param('cif');
        var locals = req.params('locals');
        var userId = req.user.id;

        Business.create({name: name, cif: cif, locals: locals, owner: userId}).exec(function (err, created) {
            if (err) return res.json(400, {error: err});
            
            Business.find({cif: created.cif}).populateAll().exec(function (err, populated) {
                if (err) return res.json(400, {error: err});

                return res.json(200, populated);
            });
        });
    },

    getProfile: function (req, res) {
        res.view('business/profile');
    },

    update: function (req, res) {
        var bodyParams = req.body;
        var id = req.param.businessid;
        var updates = {};
        var userId = req.user.id;


        if (bodyParams.length > 0) {
            bodyParams.forEach(function (param) {
                updates['param'] = param;
            });

            Business.update({id: id, owner: userId}, updates).exec(function (err, business) {
                if (err) return res.json(404, {error: err});

                return res.json(200, business);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    },

    getLocals: function (req, res) {
        Business.find(req.param.businessid).populate('locals').exec(function (err, populated) {
            if (err) return res.json(404, {error: err});

            return res.json(200, populated[0].locals);
        });
    }
};

