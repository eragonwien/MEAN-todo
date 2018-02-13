
var express = require('express');
var router = express.Router();

var userctrl = require('../users/userController');
var indexcrtl = require('../users/indexController');
var projectctrl = require('../projects/projectController');
var todoctrl = require('../todos/todoController');
/* Users */
router.get('/', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkAdminOnly, userctrl.getAllUsers);
router.get('/:uid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, userctrl.getUserByID);
router.post('/', userctrl.createNewUser);
router.put('/:uid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, userctrl.updateUserById);
router.delete('/:uid', indexcrtl.checkAdminOnly, userctrl.deleteUserById);

/* Projects */
router.get('/:uid/projects', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, projectctrl.getAllProjectsByUserId);
router.get('/:uid/projects/:pid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, projectctrl.getProjectByUserId);
router.post('/:uid/projects', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, projectctrl.createNewProjectByUserId);
router.put('/:uid/projects/:pid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, projectctrl.updateProjectById);
router.delete('/:uid/projects/:pid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, projectctrl.deleteProjectById);

/* Todos */
router.get('/:uid/projects/:pid/todos', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.getAllTodosByProject);
router.get('/:uid/projects/:pid/todos/:tid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.getTodoById);
router.get('/:uid/todos/', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.getAllTodosByUser);
router.post('/:uid/projects/:pid/todos', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.createNewTodo);
router.put('/:uid/projects/:pid/todos/:tid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.updateTodoById);
router.delete('/:uid/projects/:pid/todos/:tid', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkUserAccess, todoctrl.deleteTodoById);

module.exports = router;
