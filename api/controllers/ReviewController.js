/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    postReview: function (req, res) {
        var newReview = {
            user: req.user.id,
            local: req.param('localid'),
            message: req.param('message'),
        };

        Review.create(newReview).exec(function (err, review) {
            if (err) return res.json(400, {error: err});

            return res.json(200, review);
        });
    },

    getReviews: function (req, res) {
        
        Review.find({local: req.param('localid')}).exec(function (err, reviews) {
            if (err) return res.json(404, err);

            res.json(200, reviews);
        });

    },

    update: function (req, res) {
        var bodyParams = req.body;
        var id = req.param('reviewid');
        var userId = req.user.id;

        if (bodyParams.length > 0) {

            Review.update({id: id}, bodyParams).exec(function (err, review) {
                if (err || review.length === 0) return res.json(404, "Review not found");

                return res.json(200, review[0]);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    },

    destroy: function (req, res) {
        Review.destroy(req.param('reviewid')).exec(function (err, found) {
            if (err || found.length === 0) return res.json(404, "Review not found");

            res.json(200, found[0]);
        });
    }
};