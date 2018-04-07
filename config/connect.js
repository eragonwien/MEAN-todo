require('dotenv').config();
var mysql = require('mysql');

let pool = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : (process.env.NODE_ENV !== 'production') ? process.env.DB_TEST : process.env.DB_PRODUCTION,
  connectionLimit: process.env.DB_POOL_LIMIT,
  //debug: (process.env.NODE_ENV === 'development'), 
  multipleStatements: true
});

let pool_no_db = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_POOL_LIMIT,
  //debug: (process.env.NODE_ENV === 'development'), 
  multipleStatements: true
});

function close (pool) {
	pool.end(function(){
		//console.log('Pool closed');
	});
};

module.exports = {pool, pool_no_db, close};