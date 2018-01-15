var user = require('../models/user');
var sessionctrl = require('../config/session')
var debug = require('debug')('index_ctrl');
/* Homepage */
exports.showHome = function(req, res, next){
    res.redirect('/profile');
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
    res.redirect('/login');
}

exports.IsUserAnAdmin = function (req, res, next) {
    debug('ROLE: ' + JSON.stringify(req.session.passport.user.Role));
    if (req.session.passport.user.Role == 'Admin') {
        next();
        return;
    }
    var error = new Error('Forbidden');
    error.status = 403;
    next(error);
}

/* Sign up */
exports.showSignup = function (req, res, next) {
    res.render('signup.ejs', {
        'message': 'sign up now !'
    });
}

exports.createNewUser = function (req, res, next) {
    user.CreateNewUser(req.body, function(error, result){
        if (error) {
            return next(error);
        }
        res.render('login', {
            message: 'User created successfully.'
        });
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
        res.redirect('/');
    });
}