var pool = require('./connect').pool;
var bcrypt = require('bcrypt-nodejs');
var debug = require('debug')('user-model');

exports.getAllUsers = function(next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname, User.Last_Update FROM User;';

	pool.query(cmd, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.getUserByID = function(uid, next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname, User.Last_Update FROM User WHERE User.Uid = ? LIMIT 1;';
	var params = [uid];
	
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.getUserByEmail = function(email, next) {
    var cmd = 'SELECT User.Uid, User.Email, User.Password, User.Role, User.Firstname, User.Lastname, User.Last_Update FROM User WHERE User.Email = ? LIMIT 1;';
    var params = [email];

	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.createNewUser = function(user, next) {
	var cmd = 'INSERT INTO User (Email, Password, Role, Firstname, Lastname) VALUES(?, ?, ?, ?, ?);';

	bcrypt.hash(user.Password, null, null, function(err, hashedPassword){
		var params = [user.Email, hashedPassword, user.Role, user.Firstname, user.Lastname];
		pool.query(cmd, params, function(error, results, fields){
			if (error) {
				return next(error);
			}
			next(null, results);
		});
	});
}

exports.updateUserById = function(user, next) {
	var cmd = 'UPDATE User SET User.Firstname = ?, User.Lastname = ?, User.Role = ? WHERE User.Uid = ? LIMIT 1;';

	var params = [user.Firstname, user.Lastname, user.Role, user.Uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.updateUserByEmail = function(user, next) {
	var cmd = 'UPDATE User SET User.Firstname = ?, User.Lastname = ?, User.Role = ? WHERE User.Email = ? LIMIT 1;';

	var params = [user.Firstname, user.Lastname, user.Role, user.Email];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results);
	});
}

exports.deleteUserById = function(uid, next) {
	var cmd = 'DELETE FROM User WHERE User.Uid = ? LIMIT 1;';
	var params = [uid];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.deleteUserByEmail = function(email, next) {
	var cmd = 'DELETE FROM User WHERE User.Email = ? LIMIT 1;';
	var params = [email];
	pool.query(cmd, params, function(error, results, fields){
		if (error) {
			return next(error);
		}
		next(null, results[0]);
	});
}

exports.checkPassword = function (input, hash, next) {
	bcrypt.compare(input, hash, function(err, res) {
		next(res);
	});
}