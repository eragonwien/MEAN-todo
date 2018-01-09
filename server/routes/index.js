//var debug = require('debug')('router');

var express = require('express');
var router = express.Router();

var controller = require('../controllers/index')
/* Un-protected routes */
/* Home */
router.get('/', controller.showHome);

/* Login */
router.get('/login', controller.showLogin);
router.post('/login', controller.UserLogin);

/* Sign up */
router.get('/signup', controller.showSignup);
router.post('/signup', controller.createNewUser);

/* Log out */
router.get('/logout', controller.logout);

/* Protected routes */
/* Profile */
router.get('/profile', controller.checkUserAuthentication, controller.showProfile);

module.exports = router;
