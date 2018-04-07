require('dotenv').config();
let fs = require('fs');
let readline = require('readline-sync');
const ENV_PATH = '.env';

let Helper = require('./helper');
let helper = new Helper();

start();
function start() {
    if (!fs.existsSync(ENV_PATH)) {
        console.log('no .env found. Attemp on creating new.');
        createEnv();
        return;
    }
    console.log('.env exists');
    setupDB();
}

function finish(error) {
    if (error) {
        return console.log(error);
    }
    console.log('Setup finished successfully.');
    process.exit();
}


function createEnv() {
    console.log('creating .env');
    let env = "";
    // node environment
    let nodeEnv = readline.question('Node environment ? default: development', {defaultInput: 'development'});
    let host = readline.question('Database host ? default: localhost', {defaultInput: 'localhost'});
    let user = readline.question('Database Username ?');
    let password = readline.question('Database Password ?', {hideEchoBack: true});
    let devDB = readline.question('Name of development database ?');
    let prodDB = readline.question('Name of production database ?');
    let poolLimit = readline.questionInt('Pool limit ? default: 100', {defaultInput: 100});

    env = helper.addKeyValueLine(env, 'NODE_ENV', nodeEnv);
    env = helper.addKeyValueLine(env, 'DB_HOST', host);
    env = helper.addKeyValueLine(env, 'DB_USER', user);
    env = helper.addKeyValueLine(env, 'DB_PASSWORD', password);
    env = helper.addKeyValueLine(env, 'DB_TEST', devDB);
    env = helper.addKeyValueLine(env, 'DB_PRODUCTION', prodDB);
    env = helper.addKeyValueLine(env, 'DB_POOL_LIMIT', poolLimit);
    
    console.log(env);
    if (!readline.keyInYN('Do you want to save this as .env ?')) {
        return console.log('creating .env aborted. Reason: canceled by user.');
    }
    fs.writeFile(ENV_PATH, env, function (error) {
        if (error) {
            return console.log(error);
        }
        console.log('.env created successfully');
        setupDB();
    });
}



//setup();

function setupDB() {
    require('dotenv').config();
    if (!process.env.NODE_ENV) {
        return console.log('Environment variables not found. Try rerun the setup.');
    }
    setupDev(setupProduction);
}

// DEV setup
function setupDev(next) {
    console.log('Setting up development database');
    
}

function setupProduction(error) {
    if (error) {
        return console.log(error);
    }
    console.log('Setting up production database');  
    finish(); 
}

function createDB(error, done) {
    if (error) {
        return done(error);
    }
    let pool = require('../config/connect').pool_no_db;
    pool.query()
}



/* SET UP */
let db = require('../connection/connect');
let database = (process.env.NODE_ENV == 'production') ? process.env.DB_NAME_PRODUCTION : process.env.DB_NAME_TEST;
let tables = ['User', 'Project', 'Todo'];
let pool_no_db = db.pool_no_db;
let pool = db.pool;
let path_to_create_sql = 'config/sql/create.sql';

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
    let cmd = 'USE ' + database;
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
    let cmd = 'CREATE DATABASE ' + database + ';';
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
        let cmd = result.toString();
        
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


