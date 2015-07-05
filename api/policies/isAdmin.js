module.exports = function (req, res, next) {
    if (req.param('role') === 'admin' && req.user.role !== 'admin') {
        return res.forbidden('Only an admin user can give admin priviledges.');
    }

    next();
};