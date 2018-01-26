
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


router.get('/:uid/projects', indexcrtl.IsUserAnAdmin, projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.getProjectByUserId);
router.post('/:uid/projects', indexcrtl.IsUserAnAdmin, projectctrl.createNewProjectByUserId);
router.put('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.updateProjectById);
router.delete('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.deleteProjectById);

module.exports = router;
