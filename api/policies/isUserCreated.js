module.exports = function (req, res, next) {

    User.find({
        or: [
            {username: req.param("username")},
            {email: req.param("email")}
        ]
    }).exec(function (err, result) {

        if (result.length > 0) return res.json(400, "User " + req.param("username") + " already exists.");

        next();

    });

};