var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
//var session = require('express-session');
var cookieSession = require('cookie-session');
var index = require('./routes/index')(passport);
var users = require('./routes/users');
var projects = require('./routes/projects');
var todos = require('./routes/todos');
var gzip = require('compression');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add strategy to passport
require('./config/passport')(passport);

app.set('trust proxy', 1) // trust first proxy
var sessionConfig = require('./config/session')
app.use(cookieSession(sessionConfig.config));

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use(sessionConfig.extendCookie);

app.use(passport.initialize());
app.use(passport.session());
app.use(gzip());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') != 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
  /*
  if (process.env.NODE_ENV == 'production') {
    delete err.stack;
  }
  res.status(err.status || 500).json(err);
  */
});

module.exports = app;
