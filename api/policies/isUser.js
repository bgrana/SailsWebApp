module.exports = function (req, res, next) {
    if (req.user.id !== req.param('userid')) {
        return res.forbidden('You are not allowed to perform operations on other users.');
    }

    next();
};