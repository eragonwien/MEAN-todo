var pool = require('./connect').pool;
var debug = require('debug')('todo-model');

exports.getAllTodos = function(next) {
    var cmd = 'SELECT * FROM Todo;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getAllTodosByUserAndProject = function(uid, pid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status FROM Todo WHERE Uid=? AND Pid=?;';
    var params = [uid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getSingleTodoByUserAndProject = function(uid, pid, tid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status FROM Project WHERE Uid=? AND Pid=?;';
    var params = [uid, pid];
	
	pool.query(cmd, params, function(error, result, fields){
		if (error) {
			return next(error);
		}
		next(null, result);
	});
}

exports.createNewTodoByUserAndProject = function(pid, todo, next) {
    var cmd = 'INSERT INTO Todo (Pid, Text) VALUES(?, ?)';
    var params = [uid, todo.text];
	
	pool.query(cmd, params, function(error, result, fields){
		if (error) {
			return next(error);
		}
		next(null, result);
	});
}

exports.updateTodoByTid = function(tid, updatedTodo, next) {
    var cmd = 'UPDATE Todo SET Pid=?, Text=?, Status=? WHERE Tid = ?;';
    var params = [updatedTodo.pid, updatedTodo.text, updatedTodo.status, tid];
	
	pool.query(cmd, params, function(error, result, fields){
		if (error) {
			return next(error);
		}
		next(null, result);
	});
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