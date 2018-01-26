var express = require('express');
var router = express.Router();

var projectctrl = require('../controllers/project');
var indexcrtl = require('../controllers/index');

router.get('/', indexcrtl.IsUserAnAdmin, projectctrl.getAllProjects);


module.exports = router;