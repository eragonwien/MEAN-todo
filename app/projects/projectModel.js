var pool = require('../connection/connect').pool;
var debug = require('debug')('project_model');

exports.getAllProjects = function(next) {
    var cmd = 'SELECT Pid, Uid, Name, Progress, Status, Last_Update FROM Project;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getAllProjectsByUserId = function(uid, next) {
    var cmd = 'SELECT Pid, Uid, Name, Progress, Status, Last_Update FROM Project WHERE Uid=?;';
    var params = [uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getProjectById = function(uid, pid, next) {
    var cmd = 'SELECT Pid, Uid, Name, Progress, Status, Last_Update FROM Project WHERE Uid=? AND Pid=? LIMIT 1;';
    var params = [uid, pid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.createNewProjectByUserId = function(uid, project, next) {
	var cmd = 'INSERT INTO Project (Uid, Name, Progress, Status) VALUES(?, ?, ?, ?);';
    var params = [uid, project.Name, project.Progress, project.Status];
    pool.query(cmd, params, function(error, results, fields){
        if (error) {
            return next(error);
        }
        next(null, results);
    });
}

exports.updateProjectById = function(uid, pid, project, next) {
	var cmd = 'UPDATE Project SET Name=?, Progress=?, Status=? WHERE Project.Pid = ? AND Project.Uid=? LIMIT 1;';

	var params = [project.Name, project.Progress, project.Status, pid, uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		// attach progress to results
		results.projectProgress = project.Progress;
		next(null, results);
	});
}

exports.deleteProjectById = function(uid, pid, next) {
	var cmd_1 = 'DELETE FROM Todo WHERE Pid=?';
	var params_1 = [pid];
	pool.query(cmd_1, params_1, function(error, results, fields) {
		if(error){
			return next(error);
		}
		var cmd_2 = 'DELETE FROM Project WHERE Uid=? AND Pid=? LIMIT 1;';
		var params_2 = [uid, pid];
		pool.query(cmd_2, params_2, function(error, results, fields){
			if (error) {
				return next(error);
			}
			next(null, results);
		});
	})
}

