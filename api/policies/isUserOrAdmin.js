module.exports = function (req, res, next) {
    if (req.user.id !== req.param('userid') && !req.user.is_staff && req.param('is_staff')) {
        return res.forbidden('You are not allowed to perform operations on other users.');
    }

    next();
};