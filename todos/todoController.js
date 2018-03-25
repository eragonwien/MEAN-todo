var todos = require('./todoModel');
var debug = require('debug')('todo_controller');

exports.getAllTodos = function (req, res, next) {
    todos.getAllTodos(function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    })
}

exports.getAllTodosByProject = function (req, res, next) {
    todos.getAllTodosByProject(req.params.pid, function (error, results) {
        if (error) {
            return next(error);
        }
        res.status(200).json(results);
    })
}

exports.getAllTodosByUser = function (req, res, next) {
    todos.getAllTodosByUser(req.params.uid, function (error, results) {
        if(error) {
            return next(error);
        }
        res.status(200).json(results);
    })
}

exports.getTodoById = function (req, res, next) {
    todos.getTodoById(req.params.tid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.createNewTodo = function (req, res, next) {
    todos.createNewTodo(req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.updateTodoById = function (req, res, next) {
    todos.updateTodoByTid(req.params.tid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.deleteTodoById = function (req, res, next) {
    todos.deleteTodoById(req.params.tid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}