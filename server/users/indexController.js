var user = require('./userModel');
var sessionctrl = require('../config/session')
var debug = require('debug')('index_ctrl');
/* Homepage */
exports.showHome = function(req, res, next){
    if (process.env.NODE_ENV == 'api_development') {
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

exports.checkIfUserLoggedIn = function (req, res, next) {
    // bypass checking in development
    if (process.env.NODE_ENV != 'production') {
        next();
        return;
    }

    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).redirect('/login');
}

/*
    use for unprotected route
    admin and regular user can access
    preventing one user accessing other user's profile
 */
exports.checkUserAccess = function (req, res, next) {
    // bypass checking in api development
    if (process.env.NODE_ENV != 'production') {
        next();
        return;
    }
    // bypass as admin
    if (req.session.passport.user.Role == 'Admin') {
        next();
        return;
    }

    // check if user has the matched id
    if (req.session.passport.user.Uid == req.params.uid) {
        next();
        return;
    }
    res.status(403).end();
}

/* use for protected route */
exports.checkAdminOnly = function (req, res, next) {
    // bypass checking in development
    if (process.env.NODE_ENV != 'production') {
        next();
        return;
    }
    // only admin can bypass
    if (req.session.passport.user.Role == 'Admin') {
        next();
        return;
    }
    res.status(403).end();
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
    req.session = null;
    res.status(200).redirect('/login');
}