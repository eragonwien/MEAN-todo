var pool = require('../connection/connect').pool;

exports.testSql = function(next) {
    var cmd = 'SELECT 1 as solution;';
      pool.query(cmd, function(error, results, fields){
          if (error) {
              return next(error);
          }
          next(null, results);
      });
  }
  