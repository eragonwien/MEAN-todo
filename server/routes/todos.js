var express = require('express');
var router = express.Router();

var todoctrl = require('../todos/todoController');
var indexcrtl = require('../users/indexController');

router.get('/', indexcrtl.checkIfUserLoggedIn, indexcrtl.checkAdminOnly, todoctrl.getAllTodos);


module.exports = router;