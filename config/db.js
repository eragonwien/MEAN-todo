let mysql = require('mysql');
class Database {
    
    constructor() {
        require('dotenv').config();
        this.pool = getPool();
    }

}

function getPool() {
    let dbName = (process.env.NODE_ENV === 'development') ? process.env.DB_TEST : process.env.DB_PRODUCTION;
    if (!dbName) {
        
    }
}