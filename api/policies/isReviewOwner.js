module.exports = function (req, res, next) {
    Review.find({id:req.param('reviewid')}).exec(function (err, found) {
        if (err) return res.json(400);

        if (found.length === 0) return res.json(404, "Review not found.");

        if (found[0].owner !== req.user.id) {
            return res.forbidden('Only the owner of a review can permform operations on it.');
        }

        next();
    });
};