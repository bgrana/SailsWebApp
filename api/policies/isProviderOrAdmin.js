module.exports = function (req, res, next) {
    if (req.user.role !== 'admin' && req.user.role !== 'provider') {
        return res.forbidden('Only providers can create new businesses.');
    }

    next();
};