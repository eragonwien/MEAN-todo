var user = require('../models/project');
var debug = require('debug')('project_controller')

exports.getAllProjects = function (req, res, next) {
    user.getAllProjects(function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}

exports.getAllProjectsByUserId = function (req, res, next) {
    user.getAllProjectsByUserId(req.params.uid, function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}

exports.getSingleProjectByUserId = function (req, res, next) {
    user.getSingleProjectByUserId(req.params.uid, req.params.pid, function(error, result){
        if (error) {
            return next(error);
        }
        res.json(result);
    });
}



