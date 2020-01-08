var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//---------------------------------------------register page call------------------------------------------------------

router.signup = function(req, res){
   message = '';
   console.log("register here");
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var pass= post.password;
      // var mob= post.mob_no;
      
      var sql = "INSERT INTO `users`(`username`,`firstname`,`lastname`,`email`, `password`) VALUES ('" + name + "','" + fname + "','" + lname + "','" + email + "','" + pass + "')";
      
      var query = con.query(sql, function(err, result) {
         // console.log(sql);
         
         message = "Succesfully! Your account has been created.";
         res.render('index', {page:'MATCHA', menuId:'MATCHA'});

      });
      
   } else {
      res.render('signup');
   }
};

//-----------------------------------------------login page call------------------------------------------------------
router.login = function(req, res){
   // console.log("log in here");
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;

      if (sess.loggedin){   
         res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username});
      }
     
      var sql="SELECT id, firstname, lastname, username FROM `users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
      con.query(sql, function(err, results){      
         if(results.length){
            sess.userId = results[0].id;
            sess.user = results[0];
            sess.loggedin = true;
            // console.log(sess.userId);
            // console.log(sess.user.firstname);
            res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username});
         }
         else{
            message = 'Wrong Credentials.';
            // res.render('index.ejs',{message: message});
         res.render('index', {page:'MATCHA', menuId:'MATCHA'});

         }
                 
      });
   } else {
      // res.render('index.ejs',{message: message});
      res.render('index', {page:'MATCHA', menuId:'MATCHA'});

   }
           
};

 //-----------------------------------------------profile update------------------------------------------------------

router.update = function(req, res) {
   var sess = req.session;
   // console.log(sess);
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var gender= post.gender;

      console.log(post);
      console.log("here");
   }

   res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username});
};

// //-----------------------------------------------logout------------------------------------------------------
// router.logout = function(req, res) {
//    var sess = req.session;
//    sess.destroy(function(err){  
//          if(err){  
//              console.log(err); 
//             //  Response.errorResponse(err.message,res); 
//          }  
//          else
//              console.log('User logged out successfully!');
//          });
//    if(sess !== null)       
//          res.render('index', {page: 'MATCHA', menuID: 'MATCHA'}); 
//  };


module.exports = router;
