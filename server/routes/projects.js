var express = require('express');
var router = express.Router();

var projectctrl = require('../controllers/project');
var indexcrtl = require('../controllers/index');
/* GET users listing. */
router.get('/', indexcrtl.IsUserLoggedIn, indexcrtl.IsUserAnAdmin, projectctrl.getAllProjects);

module.exports = router;