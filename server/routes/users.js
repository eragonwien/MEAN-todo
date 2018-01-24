
var express = require('express');
var router = express.Router();

var userctrl = require('../controllers/user');
var indexcrtl = require('../controllers/index');
var projectctrl = require('../controllers/project');
/* GET users listing. */
router.get('/', userctrl.getAllUsers);

router.post('/', userctrl.createNewUser);
router.put('/:uid', userctrl.updateUserById);
router.delete('/:uid', userctrl.deleteUserById);
router.get('/:uid', userctrl.getUserByID);

/* Project listings */
router.get('/:uid/projects', indexcrtl.IsUserAnAdmin, projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.getSingleProjectByUserId);

/*
/users/:uid/projects/:pid/todos
/users/:uid/projects/:pid/todos/:tid
*/
module.exports = router;
