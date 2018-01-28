var pool = require('../connection/connect').pool;
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

exports.getAllTodosByProject = function(pid, next) {
    var cmd = 'SELECT Tid, Pid, Text, Status, Last_Update FROM Todo WHERE Pid=?;';
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
		next(null, result);
	});
}

exports.updateTodoByTid = function(tid, updatedTodo, next) {
    var cmd = 'UPDATE Todo SET Pid=?, Text=?, Status=? WHERE Tid = ?;';
    var params = [updatedTodo.Pid, updatedTodo.Text, updatedTodo.Status, tid];
	
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
