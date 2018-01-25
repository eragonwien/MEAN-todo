
var express = require('express');
var router = express.Router();

var userctrl = require('../controllers/user');
var indexcrtl = require('../controllers/index');
var projectctrl = require('../controllers/project');
/* GET users listing. */
router.get('/', indexcrtl.IsUserAnAdmin, userctrl.getAllUsers);

router.post('/', indexcrtl.IsUserAnAdmin, userctrl.createNewUser);
router.put('/:uid', indexcrtl.IsUserAnAdmin, userctrl.updateUserById);
router.delete('/:uid', indexcrtl.IsUserAnAdmin, userctrl.deleteUserById);
router.get('/:uid', indexcrtl.IsUserAnAdmin, userctrl.getUserByID);

/*
/users/:uid/projects/:pid/todos
/users/:uid/projects/:pid/todos/:tid
*/
module.exports = router;
