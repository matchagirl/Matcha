var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Matcha' });
// });

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET home page. */
router.get('/homepage', function(req, res, next) {
  var sess = req.session;
  // console.log(sess);
  res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username: sess.user.username});
});

/* GET login page*/
router.get('/login', function(req, res, next){
  // console.log("logged in");
  res.render('login', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET reister page*/
router.get('/register', function(req, res, next){
  // console.log("register");
  
  res.render('register', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET logout page*/
router.get('/logout', function(req, res, next){
  var sess = req.session;
  // console.log(sess);
   req.session.destroy(function(err){  
         if(err){  
             console.log(err); 
            //  Response.errorResponse(err.message,res); 
         }  
         else {
              // sess.loggedin = false;
             console.log('User logged out successfully!');
         }
         });
         
         //  if(sess !== null)       
         //        res.render('index', {page: 'MATCHA', menuId: 'MATCHA'}); 
         res.render('index', {page:'MATCHA', menuId:'MATCHA'});
        //  console.log(sess);
});

/* GET profile page*/
router.get('/profile', function(req, res, next){
  var sess = req.session;
  // console.log(sess);
  res.render('profile', {page:'MATCHA', menuId:'MATCHA', post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, data: sess.data});
});

/* GET profile update*/
router.get('/update', function(req, res, next){
  // console.log("jonga");
  var sess = req.session
  // console.log(sess);
  res.render('update', {page:'MATCHA', menuId:'MATCHA', data: sess.data});
});

router.get('/update2', function(req, res, next){
  // console.log("jonga");
  var sess = req.session
  // console.log(sess);
  res.render('update2', {page:'MATCHA', menuId:'MATCHA', data: sess.data});
});

// router.get('/upload', function(req, res, next){
//   console.log("you are here");
//   res.render('profile', {page:'MATCHA', menuId:'MATCHA'});
// });


module.exports = router;
