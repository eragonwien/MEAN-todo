var localstrategy = require('passport-local').Strategy;
var debug = require('debug')('passport-local-login');
var users = require('../models/user');

var strategy = new localstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, 
    function (req, email, password, next) {
        debug('email : ' + email + '//');
        users.getUserByEmail(email, function (error, user) {
            debug('error : ' + error + '//');            
            user = user[0]; // take the first entry
            debug('user : ' + JSON.stringify(user) + '//');
            
            if (error) {
                return next(error);
            } 
            if (!user) {
                debug('no user found');
                return next(null, false);
            }
            if (!users.passwordIsValid(password, user.Password)) {
                debug('invalid password');
                return next(null, false);
            }
            debug('HERE');
        return next(null, user);
    });
});

module.exports = function (passport) {
    // Session setup
    passport.serializeUser(function(user, next){
        next(null, user.Email);
    });

    passport.deserializeUser(function (email, next) {
        users.getUserByEmail(email, function(error, user){
            next(error, user);
        })
    });

    passport.use('local-login', strategy);
}