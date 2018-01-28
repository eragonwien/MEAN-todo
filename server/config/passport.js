var localstrategy = require('passport-local').Strategy;
var debug = require('debug')('passport-local-login');
var users = require('../users/userModel');

var strategy = new localstrategy({
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
    }, 
    function (req, email, password, next) {
        debug('email : ' + email + '//');
        users.getUserByEmail(email, function (error, user) {
            if (error) {
                return next(error);
            } 
            if (!user) {
                debug('no user found');
                return next(null, false, {'message': 'no user found'});
            }
            users.checkPassword(password, user.Password, function(result){
                debug('check password: ' + result);
                if (!result) {
                    debug('invalid password');
                    return next(null, false, {'message': 'invalid password'});
                }
                return next(null, user);
            });
        
    });
});

module.exports = function (passport) {
    // Session setup
    passport.serializeUser(function(user, next){
        next(null, user);
    });

    passport.deserializeUser(function (user, next) {
        users.getUserByEmail(user.Email, function(error, user){
            next(error, user);
        })
    });

    passport.use('local-login', strategy);
}