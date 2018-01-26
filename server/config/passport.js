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
            debug('error : ' + error + '//');            
            //debug('user : ' + JSON.stringify(user) + '//');
            debug('user pwd: ' + user.Password);
            debug('input pwd: ' + password);
            if (error) {
                return next(error);
            } 
            if (!user) {
                debug('no user found');
                return next(null, false, {'message': 'no user found'});
            }
            /*
            if (!users.passwordIsValid(password, user.Password)) {
                debug('invalid password');
                return next(null, false, {'message': 'invalid password'});
            }
            */
            users.checkPassword(password, user.Password, function(result){
                if (result) {
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