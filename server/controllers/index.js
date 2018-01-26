var user = require('../models/user');
var sessionctrl = require('../config/session')
var debug = require('debug')('index_ctrl');
/* Homepage */
exports.showHome = function(req, res, next){
    if (process.env.NODE_ENV == 'development-api') {
        res.redirect('/api');
        return;
    }
    res.redirect('/profile');
}

exports.showApi = function(req, res, next){
    res.render('api');
}
/* Login */
exports.showLogin = function (req, res, next) {
    res.render('login.ejs', {
        message: req.params.message
    });
}

exports.UserLogin = function (req, res, next) {
    res.redirect('/login');
}

exports.IsUserLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).end();
}

exports.IsUserAnAdmin = function (req, res, next) {
    if (process.env.NODE_ENV != 'production') {
        next();
        return;
    }
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role == 'Admin') {
            next();
            return;
        }
        return res.status(403).end();
    }
    res.status(401).end();
}

/* Sign up */
exports.showSignup = function (req, res, next) {
    res.render('signup.ejs', {
        'message': 'sign up now !'
    });
}


/* Profile */
exports.showProfile = function (req, res, next) {
    res.render('profile.ejs', {
        'user': req.user
    });
}

/* Log out */
exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy(function (error) {
        if (error) {
            next(error);
            return;
        }
    });
    res.status(200).end();
}