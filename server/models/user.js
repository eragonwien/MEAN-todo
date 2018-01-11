var pool = require('./connect').pool;
var bcrypt = require('bcrypt-nodejs');
var debug = require('debug')('user-model');
exports.getUserByID = function(uid, next) {
	debug('params: ' + uid);
    var cmd = 'CALL GetUserById(?);';
	var params = [uid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getUserByEmail = function(email, next) {
    var cmd = 'CALL getUserByEmail(?);';
    var params = [email];

	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.CreateNewUser = function(user, next) {
	var cmd = 'CALL CreateNewUser(?, ?, ?, ?, ?);';
	var hashedPassword = generateHash(user.password)
    var params = [user.email, hashedPassword, user.role, user.firstname, user.lastname];

	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

function generateHash(password) {
	return bcrypt.hashSync(password);
}

exports.passwordIsValid = function (input, hash) {
	return bcrypt.compareSync(input, hash);
}

