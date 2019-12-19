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
         console.log(sql);
         
         message = "Succesfully! Your account has been created.";
         res.render('index', {page:'MATCHA', menuId:'MATCHA'});

      });
      
   } else {
      res.render('signup');
   }
};

//-----------------------------------------------login page call------------------------------------------------------
router.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
     
      var sql="SELECT id, firstname, lastname, username FROM `users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
      con.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].username);
            // res.redirect('/home/dashboard');
            res.render('index', {page:'MATCHA', menuId:'MATCHA'});

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
module.exports = router;
