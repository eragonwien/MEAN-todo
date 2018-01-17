var pool = require('./connect').pool;
var debug = require('debug')('project-model');

exports.getAllProjects = function(next) {
    var cmd = 'SELECT Pid, Uid, Name, Target, Progress, Status, Last_Update FROM Project;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getAllProjectsByUserId = function(uid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status, Last_Update FROM Project WHERE Uid=?;';
    var params = [uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getProjectByUserId = function(uid, pid, next) {
    var cmd = 'SELECT Pid, Name, Target, Progress, Status, Last_Update FROM Project WHERE Uid=? AND Pid=? LIMIT 1;';
    var params = [uid, pid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.createNewProjectByUserId = function(uid, project, next) {
	var cmd = 'INSERT INTO Project (Uid, Name, Target, Progress, Status) VALUES(?, ?, ?, ?, ?);';
    var params = [uid, project.Name, project.Target, project.Progress, project.Status];
    pool.query(cmd, params, function(error, results, fields){
        if (error) {
            return next(error);
        }
        next(null, results);
    });
}

exports.updateProjectById = function(project, next) {
	var cmd = 'UPDATE Project SET Name=?, Target=?, Progress=?, Status=? WHERE Project.Pid = ? AND Project.Uid=? LIMIT 1;';

	var params = [project.Name, project.Target, project.Progress, project.Status, project.Pid, project.Uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.deleteProjectByUserId = function(uid, project, next) {
	var cmd = 'DELETE FROM Project WHERE Uid=? AND Pid=? LIMIT 1;';
    var params = [uid, pid];
    pool.query(cmd, params, function(error, results, fields){
        if (error) {
            return next(error);
        }
        next(null, results);
    });
}