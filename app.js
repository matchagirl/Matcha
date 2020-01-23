/**
* Module dependencies.
*/
var con         = require('./models/connection.js')
var express     = require('express')
  , routes      = require('./routes')
  , user        = require('./routes/user')
  , http        = require('http')
  , path        = require('path')
 
  , validator   = require('validator')
  , bcrypt      = require ('bcrypt')
  , nodemailer  = require('nodemailer')
  , uniqid      = require('uniqid')
  , session     = require('express-session')
  , mysql       = require('mysql')
  , bodyParser  = require("body-parser")
  
  var app       = express();

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');

global.db = con;
 
// all environments
app.set('port', process.env.PORT || 3600);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
// development only 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile

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

//Middleware
app.listen(3600, (err) => {
  if (err) throw err;
  else {
    console.log("Server running on port: 3600");
  }
});

module.exports = app;