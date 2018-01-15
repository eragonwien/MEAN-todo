
var express = require('express');
var router = express.Router();

var userctrl = require('../controllers/user');
var indexcrtl = require('../controllers/index');
var projectctrl = require('../controllers/project');
/* GET users listing. */
router.get('/', indexcrtl.IsUserLoggedIn, indexcrtl.IsUserAnAdmin, userctrl.getAllUsers);
router.get('/:id', indexcrtl.IsUserLoggedIn, indexcrtl.IsUserAnAdmin, userctrl.getUserByID);

/* Project listings */
router.get('/:uid/projects', indexcrtl.IsUserLoggedIn, indexcrtl.IsUserAnAdmin, projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', indexcrtl.IsUserLoggedIn, indexcrtl.IsUserAnAdmin, projectctrl.getSingleProjectByUserId);

/*
/users/:uid/projects/:pid/todos
/users/:uid/projects/:pid/todos/:tid
*/
module.exports = router;
