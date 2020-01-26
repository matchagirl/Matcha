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
  // console.log("????")
  res.render('index', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET home page. */
router.get('/homepage', function(req, res, next) {
  var sess = req.session;
  // console.log(sess);
  //  var fame = fame();
  //  console.log(fame)
  //  console.log("hello")
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
  console.log(sess);
  // var rate = fame();
  con.query(`SELECT * FROM views WHERE viewee = "${sess.user.username}"`, (err, results) => {
    var  v =  results.length
    con.query(`SELECT * FROM likes WHERE likes = "${sess.user.username}"`, (err, results) =>{
      var l = results.length
      con.query(`SELECT * FROM users`, (err, results) => {
        var u = results.length
        var fame = Math.trunc([(v + l)/ u] * 100) + "%"
        //  console.log(fame);
        con.query(`UPDATE users SET frate = "${fame}" WHERE `)
      })
    })
  })
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
  // console.log(address);
	//change the user id to the one in the session or something
	con.query("SELECT * FROM locations WHERE user_id = '" + sess.userId +"'", (err, results) => {
    if (err){
    // console.log(err);
    res.sendStatus(500);
  } else if (results.length === 0) {
      con.query(`INSERT INTO locations (user_id, Longitude, Latitude,StreetName,City,postal_code) VALUES("${sess.userId}", "${address.lon}", "${address.lat}","${address.street}","${address.city}","${address.postal_code}")`);
      // alert("no");
      con.query(`UPDATE users SET city = "${address.city}" WHERE id ="${sess.userId}"`);
			res.sendStatus(200);
	} else {
      // console.log("lona ");
      con.query(`UPDATE locations SET user_id = "${sess.userId}", longitude = "${address.lon}", latitude = "${address.lat}", StreetName = "${address.street}",City = "${address.city}",postal_code = "${address.postal_code}" WHERE user_id ="${sess.userId}"`);
      con.query(`UPDATE users SET city = "${address.city}" WHERE id = "${sess.userId}"`);
      res.sendStatus(200);
		}
	});
});

router.get('/view', function (req, res, next) {
  // console.log("Here Here");
 var sess = req.session;
 var username = req.query.username;
 var userID = req.query.uid

 con.query(`SELECT * FROM views WHERE viewee ="${username}" AND viewer ="${sess.user.username}"`, (err, results)=>{
   if (results.length == 0){
     con.query(`INSERT INTO views (user_id, viewer, viewee) VALUES ("${sess.userId}", "${sess.user.username}", "${username}")`)
   }
 })

 con.query(`SELECT * FROM users WHERE id ="${userID}"`, function(err, results){
   if (err) throw err
   var user = results[0];
  //  console.log(user);
  con.query(`SELECT * FROM profiles WHERE userId ="${userID}"`, function(err, results){
    var data = results[0];
    // console.log(data)
    con.query(`SELECT * FROM userinterest WHERE userId = "${userID}"`,  function(err, results){
        const inte = [];
        results.forEach(function(iterm){
          inte.push(iterm.inteId)
        })
        // console.log(post);
        var sql = `SELECT * FROM interest WHERE id in (?)`;
        con.query(sql, [[...inte]], function(err, results){
          // console.log(results);
          const post = []
          results.forEach(function(iterm){
            post.push(iterm.name)
          })
          // console.log(post);
          // console.log(data);
          // console.log(user);
          res.render('view', { page: 'MATCHA', menuId: 'MATCHA', post: post, user: user, data: data, username: sess.user.username });
        })
    })
  })
 }) 
});

router.get('/like', function(req, res, next){
  // console.log("jonga");
  var sess = req.session
  // console.log(sess);
  res.render('like', {page:'MATCHA', menuId:'MATCHA', data: sess.data, username: sess.user.username});
});

// function fame(req, res){
//   // var sess = req.session;
//   con.query(`SELECT * FROM views WHERE viewee = "${sess.user.username}"`, (err, results) => {
//     var  v = results.count
//     con.query(`SELECT * FROM likes WHERE likes = "${sess.user.username}"`, (err, results) =>{
//       var l = results.count
//       con.query(`SELECT * FROM users`, (err, results) => {
//         var u = results.count
//         var fame = (v + l)/ u * 100 
//          return (fame);
//       })
//     })
//   })
// }



module.exports = router;
