module.exports = function (req, res, next) {
    if (!req.user.is_staff) {
        return res.forbidden('Only an admin user can give admin priviledges.');
    }

    next();
};