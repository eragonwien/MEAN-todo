var user = require('../models/user');

exports.getUserByID = function (req, res, next) {
    user.getUserByID(req.params.id, function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}
