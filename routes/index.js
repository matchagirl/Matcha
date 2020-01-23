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
  if (!sess.suggest)
      sess.suggest = [];
  res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data, post: sess.post, suggest: sess.suggest});

  // res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username: sess.user.username});
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
  res.render('profile', {page:'MATCHA', menuId:'MATCHA', post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, data: sess.data,});
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

router.post('/saveLocation', function (req, res, next) {
  var address = req.body;
  var sess = req.session
  // console.log(sess.userId);
	//change the user id to the one in the session or something
	con.query("SELECT * FROM locations WHERE user_id = '" + sess.userId +"'", (err, results) => {
		if (err)
      res.sendStatus(500);
      else if (!results) {
      // console.log(results); 
			con.query(`INSERT INTO locations (user_id, Longitude, Latitude,StreetName,City,postal_code) VALUES("${sess.userId}", "${address.lon}", "${address.lat}","${address.street}","${address.city}","${address.postal_code}")`);
			res.sendStatus(200);
		} else {
			con.query(`UPDATE locations SET user_id = "${sess.userId}", longitude = "${address.lon}", latitude = "${address.lat}", StreetName = "${address.street}",City = "${address.city}",postal_code = "${address.postal_code}" WHERE user_id ="${sess.userId}"`);
			res.sendStatus(200);
		}
	});
});

// router.get('/upload', function(req, res, next){
//   console.log("you are here");
//   res.render('profile', {page:'MATCHA', menuId:'MATCHA'});
// });


module.exports = router;
