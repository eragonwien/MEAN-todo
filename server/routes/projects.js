var express = require('express');
var router = express.Router();

var projectctrl = require('../projects/projectController');
var indexcrtl = require('../users/indexController');

router.get('/', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkAdminOnly, projectctrl.getAllProjects);


module.exports = router;