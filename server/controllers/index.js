var model = require('../models/todos');
/* Homepage */
exports.showHome = function(req, res, next){
    res.render('index', {
        'title': 'Todo-app',
        'mode': (process.env.NODE_ENV) ? process.env.NODE_ENV : 'none'
    });
}
/* Login */
exports.showLogin = function (req, res, next) {
    res.render('login.ejs', {
        'message': req.flash('loginMessage')
    });
}

exports.UserLogin = function (req, res, next) {
    res.redirect('/login');
}

exports.checkUserAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    var err = new Error('Access denied');
    err.status = 401;
    next(err);
}

/* Sign up */
exports.showSignup = function (req, res, next) {
    res.render('signup.ejs', {
        'message': req.flash('signupMessage')
    });
}

exports.createNewUser = function (req, res, next) {
    res.redirect('/signup');
}
/* Profile */
exports.showProfile = function (req, res, next) {
    res.render('profile.ejs', {
        'user': req.user
    });
}

/* Log out */
exports.logout = function (req, res, next) {
    res.logout();
    res.render('index', {
        'message': 'logged out'
    });
}