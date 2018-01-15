var debug = require('debug')('session_cookie');
exports.config = {
    secret: 'milleniumbalkon',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
};

exports.cookies = function(req, res, next){
    var minutes = process.env.COOKIE_AGE_MINUTES;
    var hour = (minutes)? minutes : 60; // default 60 minutes
    hour *= 60 * 1000;
    
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
    debug('cookie:' + req.session.cookie.expires);
    next();
};
