var pool = require('./connect').pool;
var debug = require('debug')('project-model');

exports.getAllProjects = function(next) {
    var cmd = 'SELECT Pid, Uid, Name, Target, Progress, Status FROM Project;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getAllProjectsByUserId = function(uid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status FROM Project WHERE Uid=?;';
    var params = [uid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getSingleProjectByUserId = function(uid, pid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status FROM Project WHERE Uid=? AND Pid=?;';
    var params = [uid, pid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

// TODO: get all projects by user email
// TODO: get project by pid and user email

exports.CreateNewProjectByUserId = function(uid, project, next) {
	var cmd = 'INSERT INTO Project (Uid, Name, Target) VALUES(?, ?, ?);';

    var params = [uid, project.name, project.target];
    pool.query(cmd, params, function(error, results, fields){
        if (error) {
            return next(error);
        }
        next(null, results);
    });
}

// TODO: create project by email
// TODO: update project by user id and pid
// TODO: update project by user email and pid
// TODO: delete project by user id and pid




/* Project & User */
