var user = require('./userModel');
var debug = require('debug')('user_controller')

exports.getAllUsers = function (req, res, next) {
    user.getAllUsers(function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getUserByID = function (req, res, next) {
    user.getUserByID(req.params.uid, function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.createNewUser = function (req, res, next) {
    user.createNewUser(req.body, function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.updateUserById = function (req, res, next) {
    user.updateUserById(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.deleteUserById = function (req, res, next) {
    user.deleteUserById(req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}


exports.authenticateUser = function(passport) {
    return function(req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                debug('error');
                return next(err);
            }
            if (!user) {
                debug(info.message);
                return res.status(401).end();
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).redirect('/profile');
              });
        })(req, res, next);
    };
}
