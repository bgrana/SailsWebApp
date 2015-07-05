module.exports = function (req, res, next) {

    Business.find({
        cif: req.param("cif")
    }).exec(function (err, result) {

        if (result.length > 0) return res.json(400, "A business with CIF " + req.param("cif") + " already exists.");

        next();

    });

};