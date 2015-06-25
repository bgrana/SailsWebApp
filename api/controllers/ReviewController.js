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
            local: req.params.localid,
            message: req.param('message'),
        };

        Review.create(newReview).exec(function (err, review) {
            Review.find({id: review.id}).populateAll().exec(function (err, populated) {
                if (err) return res.json(404, {error: err});

                return res.json(200, populated);
            });
        });
    },

    getReviews: function (req, res) {
        
        Review.find({local: req.query.localid}).exec(function (err, reviews) {
            if (err) return res.json(404, err);

            res.json(200, reviews);
        });

    },

    edit: function (req, res) {
        var bodyParams = req.body;
        var id = req.param.reviewid;
        var updates = {};
        var userId = req.user.id;

        if (bodyParams.length > 0) {
            bodyParams.forEach(function (param) {
                updates['param'] = param;
            });

            Review.update({id: id}, updates).populate('local').exec(function (err, review) {
                if (err) return res.json(404, {error: err});

                if (userId !== review.user) {
                    return res.json(401, {error: "User not allowed to edit this review"});
                }

                return res.json(200, review);
            });
        }

        return res.json(200, {message: "No parameters were given"});
    }
};