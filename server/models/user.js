var pool = require('./connect').pool;
var bcrypt = require('bcrypt-nodejs');
var debug = require('debug')('user-model');

exports.getAllUsers = function(next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname FROM User;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getUserByID = function(uid, next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname FROM User WHERE User.Uid = ? LIMIT 1;';
	var params = [uid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.getUserByEmail = function(email, next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Password, User.Role, User.Firstname, User.Lastname FROM User WHERE User.Email = ? LIMIT 1;';
    var params = [email];

	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.CreateNewUser = function(user, next) {
	var cmd = 'INSERT INTO User (Email, Password, Role, Firstname, Lastname) VALUES(?, ?, ?, ?, ?);';

	bcrypt.hash(user.password, null, null, function(err, hashedPassword){
		var params = [user.email, hashedPassword, user.role, user.firstname, user.lastname];
		pool.query(cmd, params, function(error, results, fields){
			if (error) {
				return next(error);
			}
			next(null, results);
		});
	});
}

exports.UpdateUserById = function(user, next) {
	var cmd = 'UPDATE User SET User.Firstname = firstname, User.Lastname = lastname, User.Role = role WHERE User.Uid = uid;';

	var params = [user.firstname, user.lastname, user.role, user.uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.UpdateUserByEmail = function(user, next) {
	var cmd = 'UPDATE User SET User.Firstname = ?, User.Lastname = ?, User.Role = ? WHERE User.Email = ?;';

	var params = [user.firstname, user.lastname, user.role, user.email];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.DeleteUserById = function(uid, next) {
	var cmd = 'DELETE FROM User WHERE User.Uid = ? LIMIT 1;';
	var params = [uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.DeleteUserByEmail = function(email, next) {
	var cmd = 'DELETE FROM User WHERE User.Email = ? LIMIT 1;';
	var params = [email];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.passwordIsValid = function (input, hash) {
	return bcrypt.compareSync(input, hash);
}

