var pool = require('../connection/connect').pool;
var debug = require('debug')('todo_model');
var projectModel = require('../projects/projectModel');
exports.getAllTodos = function(next) {
    var cmd = 'SELECT * FROM Todo;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

function getAllTodosByProject(pid, next) {
    var cmd = 'SELECT Tid, Pid, Text, Status, Last_Update FROM Todo WHERE Pid=?;';
	var params = [pid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}
exports.getAllTodosByProject = getAllTodosByProject;
exports.getAllTodosByUser = function(uid, next) {
	var cmd = 'SELECT User.Uid, Todo.* FROM User INNER JOIN Project ON User.Uid = Project.Uid INNER JOIN Todo ON Project.Pid = Todo.Pid WHERE User.Uid=?;';
	var params = [uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getTodoById = function(tid, next) {
    var cmd = 'SELECT Tid, Pid, Text, Status, Last_Update FROM Todo WHERE Tid=? LIMIT 1;';
    var params = [tid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.createNewTodo = function(todo, next) {
    var cmd = 'INSERT INTO Todo (Pid, Status, Text) VALUES(?, ?, ?);';
    var params = [todo.Pid, todo.Status, todo.Text];
	
	pool.query(cmd, params, function(error, result, fields){
		if (error) {
			return next(error);
		}
		next(null, result)
	});
}

exports.updateTodoByTid = function(tid, updatedTodo, next) {
    var cmd = 'UPDATE Todo SET Pid=?, Text=?, Status=? WHERE Tid = ?;';
    var params = [updatedTodo.Pid, updatedTodo.Text, updatedTodo.Status, tid];
	
	pool.query(cmd, params, function(error, result, fields){
		if (error) {
			return next(error);
		}
		// re-count the status of all todos then update the parent project
		changeProgressOfProject(updatedTodo.Uid, updatedTodo.Pid, next);
	});
}

function changeProgressOfProject(uid, pid, next) {
	var cmd = 'SELECT (SUM(Todo.Status = ?) / COUNT(*)) * 100 AS progress FROM Todo WHERE Todo.Pid=?;';
	var params = ['Complete', pid];
	pool.query(cmd, params, function (error, results) {
		if (error) {
			return next(error);
		}
		debug(results);
		var progress = results[0].progress;
		projectModel.getProjectById(uid, pid, function (error, project) {
			if (error) {
				return next(error);
			}
			project.Progress = progress;
			projectModel.updateProjectById(uid, pid, project, next);
		})
	})
}

exports.deleteTodoById = function(tid, next) {
	var cmd = 'DELETE FROM Todo WHERE Todo.Tid = ? LIMIT 1;';
	var params = [tid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}
