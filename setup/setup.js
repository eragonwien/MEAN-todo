/**
 * check if database exist
 *      if not, create new, go to yes
 *      if yes, read .sql file and create tables
 */
var env = require('dotenv').config();
var fs = require('fs');


/* CREATE .ENV */
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var envFile = '.env';

function createEnvFile() {
    addNodeEnv();
}

function addEnvLine(question, env_key, next) {
    rl.question(question, function (value) {
        var line = env_key + '=' + value + '\n';
        fs.appendFile(envFile, line, function (error) {
            if (error) {
                return next(error);
            }
            next();
        })
    })
}

function addNodeEnv(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('Node environtment ?', 'NODE_ENV', addHost);
}

function addHost(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('SQL host ?', 'DB_HOST', addUsername);
}

function addUsername(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('SQL username ?', 'DB_USER', addPassword);    
}

function addPassword(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('SQL password ?', 'DB_PASSWORD', addTestDB);    
}

function addTestDB(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('SQL database name for testing ?', 'DB_NAME_TEST', addProductionDB);    
}

function addProductionDB(error) {
    if (error) {
        console.log(error);
        return;
    }
    addEnvLine('SQL database for production ?', 'DB_NAME_PRODUCTION', setup);    
}

setup();

function setup() {
    checkIfEnvFileExists();
}

/* SET UP */
var db = require('../connection/connect');
var database = (process.env.NODE_ENV == 'production') ? process.env.DB_NAME_PRODUCTION : process.env.DB_NAME_TEST;
var tables = ['User', 'Project', 'Todo'];
var pool_no_db = db.pool_no_db;
var pool = db.pool;
var path_to_create_sql = 'config/sql/create.sql';

function checkIfEnvFileExists() {
    console.log('Check if' + envFile + 'exists');
    fs.readFile(envFile, function (error, result) {
        if (error) {
            console.log('File ' + envFile +'not found.');
            return createEnvFile();
        }
        console.log('File ' + envFile +' exists.')
        checkDatabaseExist(database);
    })
}

function checkDatabaseExist(database) {
    console.log('Checking if database ' + database + ' exists')
    if (!database) {
        return finishSetup('database name not found.');
    }
    var cmd = 'USE ' + database;
    pool_no_db.query(cmd, null, function (error, result) {
        if (error) {
            // database does not exists
            createDatabase(database);
            return;
        }
        // database exists
        createTables(database);
    })
}

function createDatabase(database) {
    console.log('Create database ' + database);
    var cmd = 'CREATE DATABASE ' + database + ';';
    pool_no_db.query(cmd, null, function (error, result) {
        if (error) {
            return finishSetup(error);
        }
        createTables(database);
    })
}



function createTables(database) {
    console.log('Creating Tables for database ' + database);
    fs.readFile(path_to_create_sql, function (error, result) {
        if (error) {
            return finishSetup(error);
        }        
        var cmd = result.toString();
        
        pool.query(cmd, null, function (error, result) {
            if (error) {
                return finishSetup(error);
            }
            console.log('Tables created');
            // fnished without error
            finishSetup(null);
        })
    })
}

function finishSetup(error) {
    if (error) {
        console.log(error);
    }
    db.close(pool_no_db);
    db.close(pool);
    console.log('Finished');
    process.exit();
}


