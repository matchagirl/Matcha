const con         = require('../models/connection.js');
var express = require('express');
var router = express.Router();
var validator = require('validator');
var bcrypt = require ('bcrypt');
var nodemailer = require('nodemailer');
var uniqid = require('uniqid');
const saltRounds = 10;
var regex = require('regex');
//---------------------------------------------signup page call------------------------------------------------------
function sendEmail(name, vcode, email) {
   var text = "Welcome to matcha , we are here to help you connect with your soul mate, please click on the link to activate your account http://localhost:3600/activate?name="+name+","+ vcode;
   transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: 'matchamatch2@gmail.com',
           pass: 'matchme@123'
       }
   });
   mailOptions = {
       from: '"Matcha" <mmodisad@student.wethinkcode.co.za>',
       to: email,
       subject: 'Matcha registration',
       text: text,
       html: '<a>'+text+'</a>'
   };
   transporter.sendMail(mailOptions, function(error, info){
       if(error){
           return console.log(error);
       }
       console.log('Message sent: ' + info.response);
   });
}

exports.signup = function(req, res){
   message = '';
   error = '';
   if(req.method == "POST"){
      var post  = req.body;
      
      var name= post.user_name;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var pass= post.password;
      var vcode = uniqid();
      
      if (post.name == '' || post.fname == '' || post.lname == '' || post.email == '' || post.pass == '') {
         message = "All fileds are required.";
         res.render('signup.ejs', {error: message});
         return false;

      }else if (validator.isLength(fname, {min:3}) == false)
      {
         message =  "Firstname requires minimum of 3 characters";
         res.render('signup.ejs', {error: message});
         return true;
      }else if (validator.isLength(lname, {min:3}) == false)
      {
         message =  "Last Name requires minimum of 3 characters";
         res.render('signup.ejs', {error: message});
         return true;
      }else if (validator.isLength(pass, {min:6}) == false)
      {
         message =  "Password must be atleast 6 characters";
         res.render('signup.ejs', {error: message});
         return true;
      }else if (validator.isEmail(email) == false) {
         message = "Invalid email address";
         res.render('signup.ejs', {error: message});
      }

       // Store hash in your password DB.
      bcrypt.hash(pass, saltRounds, function(err, hash) {
         var sql ="INSERT INTO `users`(`username`,`firstname`,`lastname`,`email`, `password`,`vcode` ) VALUES ('" + name + "','" + fname + "','" + lname + "','" + email + "','" + hash + "','" + vcode + "')";
         var query = con.query(sql, function(err, result) {
           }); 
         
          message = "Succesfully! Your account has been created.";
          res.render('signup.ejs',{error: message});
            });
          sendEmail(name, vcode, email);
          //message = "A confirmation email has been sent to you";
          res.render('verify.ejs', {error:message })
          
    } else {
       res.render('signup');
    }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
