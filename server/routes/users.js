
var express = require('express');
var router = express.Router();

var userctrl = require('../controllers/user');
var indexcrtl = require('../controllers/index');
var projectctrl = require('../controllers/project');
/* GET users listing. */
router.get('/', userctrl.getAllUsers);
router.get('/:id', userctrl.getUserByID);

/* Project listings */
router.get('/:uid/projects', projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', projectctrl.getSingleProjectByUserId);

/*
/users/:uid/projects/:pid/todos
/users/:uid/projects/:pid/todos/:tid
*/
module.exports = router;
