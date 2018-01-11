//var debug = require('debug')('router');

var express = require('express');
var router = express.Router();

var indexctrl = require('../controllers/index');

/* Un-protected routes */
/* Home */
router.get('/', indexctrl.showHome);

/* Login */
router.get('/login', indexctrl.showLogin);


/* Sign up */
router.get('/signup', indexctrl.showSignup);
router.post('/signup', indexctrl.createNewUser);


/* Log out */
router.get('/logout', indexctrl.logout);

/* Protected routes */
/* Profile */
router.get('/profile', indexctrl.IsUserLoggedIn, indexctrl.showProfile);

module.exports = function(passport){
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    
    return router;
};
