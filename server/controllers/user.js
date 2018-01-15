var user = require('../models/user');
var debug = require('debug')('user_controller')

exports.getAllUsers = function (req, res, next) {
    user.getAllUsers(function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}

exports.getUserByID = function (req, res, next) {
    user.getUserByID(req.params.id, function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}


exports.authenticateUser = function(passport) {
    return function(req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                return next(err);
            }
            var message = (info) ? info.message : '';
            if (!user) {
                return res.render('login', {
                    'message': message
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/profile');
              });
        })(req, res, next);
    };
}
