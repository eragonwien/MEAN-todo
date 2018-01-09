var dotenv = require('dotenv').config();
var mysql = require('mysql');
var db = require('../config/database');


exports.pool = mysql.createPool({
  host     : db.DB_HOST,
  user     : db.DB_USER,
  password : db.DB_PASSWORD,
  database : (process.env.NODE_ENV === 'development') ? db.DB_TEST : db.DB_PRODUCTION,
  connectionLimit: db.DB_POOL_LIMIT,
  //debug: (process.env.NODE_ENV === 'development'), 
  multipleStatements: true
});


exports.closePool = function(pool) {
	pool.end(function(){
		//console.log('Pool closed');
	});
}