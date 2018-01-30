//var debug = require('debug')('router');

var express = require('express');
var router = express.Router();

var indexctrl = require('../users/indexController');
var userctrl = require('../users/userController');
var sessionctrl = require('../config/session')

/* Un-protected routes */
/* Home */
router.get('/', indexctrl.showHome);
router.get('/api', indexctrl.showApi);

/* Login */
router.get('/login', indexctrl.showLogin);

/* Sign up */
router.get('/signup', indexctrl.showSignup);
router.post('/signup', userctrl.createNewUser);

/* Log out */
router.post('/logout', indexctrl.logout);

/* Protected routes */
/* Check login */
router.get('/auth', indexctrl.IsUserLoggedIn);

/* Profile */
router.get('/profile', indexctrl.checkIfUserLoggedIn, indexctrl.showProfile);

module.exports = function(passport){

    /* authenticate user */
    router.post('/login', userctrl.authenticateUser(passport));
 
    return router;
};
