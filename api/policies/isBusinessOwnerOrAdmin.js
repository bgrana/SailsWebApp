module.exports = function (req, res, next) {
    Business.find({id:req.param('businessid')}).exec(function (err, found) {
        if (err) return res.json(400);

        if (found.length === 0) return res.json(404, "Business not found.");

        if (found[0].owner !== req.user.id && req.user.role !== 'admin') {
            return res.forbidden('Only the owner of a business can permform operations on it.');
        }

        next();
    });
};