var user = require('../models/project');
var debug = require('debug')('project_controller')

exports.getAllProjects = function (req, res, next) {
    user.getAllProjects(function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getAllProjectsByUserId = function (req, res, next) {
    user.getAllProjectsByUserId(req.params.uid, function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.getProjectByUserId = function (req, res, next) {
    user.getProjectById(req.params.uid, req.params.pid, function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    });
}

exports.createNewProjectByUserId = function (req, res, next) {
    user.createNewProjectByUserId(req.params.uid, req.body, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.updateProjectById = function(req, res, next){
    user.updateProjectById(req.params.uid, req.params.pid, req.body, function(error, result){
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}

exports.deleteProjectById = function(req, res, next) {
    user.deleteProjectById(req.params.uid, req.params.uid, function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).json(result);
    })
}


