var user = require('./userModel');
var sessionctrl = require('../config/session')
var debug = require('debug')('index_ctrl');
/* Homepage */
exports.showHome = function(req, res, next){
    res.render('index');
}

exports.showApi = function(req, res, next){
    //res.render('api');
    res.render('api');
}
/* Login */
exports.showLogin = function (req, res, next) {
    // check if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    }
    res.render('login.ejs');
}

exports.UserLogin = function (req, res, next) {
    res.redirect('/login');
}

exports.IsUserLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        var authUser = req.session.passport.user;
        delete  authUser['Password']; // remove password field
        return res.status(200).json(authUser);
    }
    res.status(401).end();
}

exports.checkIfUserLoggedIn = function (req, res, next) {
    // bypass checking in development
    if (process.env.NODE_ENV == 'api_development') {
        next();
        return;
    }
    debug(req.session);
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).end();
}

/*
    use for unprotected route
    admin and regular user can access
    preventing one user accessing other user's profile
 */
exports.checkUserAccess = function (req, res, next) {
    // bypass checking in api development
    if (process.env.NODE_ENV == 'api_development') {
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
    if (process.env.NODE_ENV == 'api_development') {
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
    res.render('signup.ejs');
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
    res.status(200).end();
}