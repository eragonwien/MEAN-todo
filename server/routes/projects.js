var express = require('express');
var router = express.Router();

var projectctrl = require('../controllers/project');
var indexcrtl = require('../controllers/index');

router.get('/', indexcrtl.IsUserAnAdmin, projectctrl.getAllProjects);
router.get('/:uid/projects', indexcrtl.IsUserAnAdmin, projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.getSingleProjectByUserId);
router.post('/:uid/projects', indexcrtl.IsUserAnAdmin, projectctrl.createNewProjectByUserId);
router.put('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.updateProjectById);
router.delete('/:uid/projects/:pid', indexcrtl.IsUserAnAdmin, projectctrl.deleteProjectById);

module.exports = router;