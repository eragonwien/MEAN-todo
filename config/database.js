var config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_TEST: process.env.DB_NAME_TEST,
    DB_PRODUCTION: process.env.DB_NAME_PRODUCTION,
    DB_POOL_LIMIT: 100, // number of connections per pool
    DB_NUM_OF_FAKE_DATA: 100 // used for test generator
}

module.exports = config;