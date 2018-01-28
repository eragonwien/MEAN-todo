var debug = require('debug')('session_cookie');
exports.config = {
    //resave: false,
    //saveUninitialized: true,
    name: 'session_meantodo',
    keys: ['milleniumBalkon'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours cookie 
};

exports.extendCookie = function(req, res, next){
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next();
};
