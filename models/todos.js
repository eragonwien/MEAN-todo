var pool = require('./connect').pool;

exports.getTodos = function(done){
    var cmd = 'SELECT * FROM Todos';
	pool.query(cmd, function(error, results){
		if (error) {
			return done(error);
		}
		done(null, results);
	});
}