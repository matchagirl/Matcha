var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

var routes = require('./routes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var regRouter = require('./routes/register');


var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var con = require('./models/connection.js');

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { maxAge: 60000000}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/login', loginRouter);
// app.use('/register', regRouter);


// app.get('/', routes.index);//call for main index page
// app.get('/login', routes.index);//call for login page
// app.get('/signup', usersRouter.signup);//call for signup page

app.post('/signup', usersRouter.signup);//call for signup post
app.post('/login', usersRouter.login);//call for login post
app.post('/update', usersRouter.update);//call for upload post


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, (err) => {
  if (err) throw err;
  else {
    console.log("Server running on port: 8080");
  }
});

module.exports = app;
