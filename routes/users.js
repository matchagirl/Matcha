var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');
// var fileUpload = require('express-fileupload');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//---------------------------------------------register page call------------------------------------------------------

router.signup = function(req, res){
  var message = '';
   console.log("register here");
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var pass= post.password;
      // var mob= post.mob_no;
      
      var sql ="INSERT INTO `users`(`username`,`firstname`,`lastname`,`email`, `password`) VALUES ('" + name + "','" + fname + "','" + lname + "','" + email + "','" + pass + "')";
      
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
   var message = '';
   
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var gender= post.gender;
      var sexualpref= post.sexualpreference;
      var biography= post.biography[0];
      var extremeSport = post.extreme_sport;
      var outdoor = post.outdoor_activities;
      var geekSport = post.geek_sports;
      var foodie = post.foodie;
      var BDSM = post.BDSM
      var propic = req.files.avator;
      var image1 = req.files.image1;
      var image2 = req.files.image2;
      var image3 = req.files.image3;
      var image4 = req. files.image4;
 


      var userID = sess.user.id;
      console.log(post);

      if (name){
         var sql="SELECT*FROM `users` WHERE `username`='"+name+"'";
         con.query(sql, function(err, results){
            // console.log(results);
            if (!results.length){
               
               var sql= "UPDATE `users` SET `username` ='"+name+"' WHERE id ='"+sess.user.id+"'";
               con.query(sql, function(err){
                  if (err){console.log(err)};
               })
               var sql = "SELECT*FROM `users` WHERE id = '"+sess.user.id+"'";
               con.query(sql, function(err, results){
                  // console.log(results)
                  if(results.length){
                        sess.userId = results[0].id;
                        sess.user = results[0];
                        sess.loggedin = true;
                     //  console.log("nothing helps");
                     // console.log(sess.user);
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
                  }
                  else{console.log(err)
                  }
               });
            }
            else{
                  message = "username already exist";
                  console.log("username already exist");
                  res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});

            }
         });
      }
      if (fname){
         var sql= "UPDATE `users` SET `firstname` ='"+fname+"' WHERE id ='"+sess.user.id+"'";
         con.query(sql, function(err){
            if (err){console.log(err)};
         })
         var sql = "SELECT*FROM `users` WHERE id = '"+sess.user.id+"'";
         con.query(sql, function(err, results){
            // console.log(results)
            if(results.length){
                  sess.userId = results[0].id;
                  sess.user = results[0];
                  sess.loggedin = true;
               //  console.log("nothing helps");
               // console.log(sess.user);
               res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
            }
            else{console.log(err)
            }
         });
         
      }
      if (lname){
         var sql= "UPDATE `users` SET `lastname` ='"+lname+"' WHERE id ='"+sess.user.id+"'";
         con.query(sql, function(err){
            if (err){console.log(err)};
         })
         var sql = "SELECT*FROM `users` WHERE id = '"+sess.user.id+"'";
         con.query(sql, function(err, results){
            // console.log(results)
            if(results.length){
                  sess.userId = results[0].id;
                  sess.user = results[0];
                  sess.loggedin = true;
               //  console.log("nothing helps");
               // console.log(sess.user);
               res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
            }
            else{console.log(err)
            }
         });
      }

      if (email){
         var sql="SELECT*FROM `users` WHERE `email`='"+email+"'";
         con.query(sql, function(err, results){
            // console.log(results);
            if (!results.length){
               
               var sql= "UPDATE `users` SET `email` ='"+email+"' WHERE id ='"+sess.user.id+"'";
               con.query(sql, function(err){
                  if (err){console.log(err)};
               })
               var sql = "SELECT*FROM `users` WHERE id = '"+sess.user.id+"'";
               con.query(sql, function(err, results){
                  // console.log(results)
                  if(results.length){
                        sess.userId = results[0].id;
                        sess.user = results[0];
                        sess.loggedin = true;
                     //  console.log("nothing helps");
                     // console.log(sess.user);
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
                  }
                  else{console.log(err)
                  }
               });
            }
            else{
                  message = "email already exist";
                  console.log("email already exist");
                  res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});

            }
         });

         
      }
      if (gender && sexualpref && biography){
         // var userID = sess.user.userID;
         // console.log(userID) ;
         var sql = "INSERT INTO `profiles` (`userID`,`gender`,`sexualpref`,`biography`) VALUES ( '" +userID +"','" + gender + "','" + sexualpref + "','" + biography + "')";
      
         var query = con.query(sql, function(err, result) {
            if(err){
               console.log(err);
            }
         });

         var sql = "SELECT `id` FROM `profiles` WHERE userId = '"+ userID +"'";
         con.query(sql, function(err, results){
            // console.log(results)
            if(results.length){
                  sess.profileId = results[0].id;
                  var profileId = sess.profileId;
                  // console.log(profileId);            
                     if (extremeSport){
                        var sql = "UPDATE `profiles` SET `extremeSport` = '" + userID + "' WHERE  `id` = '"+ sess.profileId +"'";
                     
                        var query = con.query(sql, function(err, result) {
                           if(err){
                              console.log(err);
                           }
                        });
                     }
                     if (outdoor){
                        var sql = "UPDATE `profiles` SET `outdoor` = '" + userID + "' WHERE  `id` = '"+ profileId +"'";
                     
                        var query = con.query(sql, function(err, result) {
                           if(err){
                              console.log(err);
                           }
                        });
               
                     }
                     if (geekSport){
                        var sql = "UPDATE `profiles` SET `geekSport` = '" + userID + "' WHERE  `id` = '"+ profileId +"'";
                     
                        var query = con.query(sql, function(err, result) {
                           if(err){
                              console.log(err);
                           }
                        });
               
                     }
                     if (foodie){
                        var sql = "UPDATE `profiles` SET `foodie` = '" + userID + "' WHERE  `id` = '"+ profileId +"'";
                     
                        var query = con.query(sql, function(err, result) {
                           if(err){
                              console.log(err);
                           }
                        });
               
                     }
                     if (BDSM){
                        var sql = "UPDATE `profiles` SET `BDSM` = '" + userID + "' WHERE  `id` = '"+ profileId +"'";
                     
                        var query = con.query(sql, function(err, result) {
                           if(err){
                              console.log(err);
                           }
                        });
                        
                     }
                     // var propic = post.avator;
                     if(propic){
                     var avator = propic.name;
                     // console.log(propic);
                     if(propic.mimetype == "image/jpeg" ||propic.mimetype == "image/png"||propic.mimetype == "image/gif" ){
                        propic.mv('public/images/upload_images/'+propic.name, function(err) {
                           if (err)
                             return res.status(500).send(err);
                               var sql = "UPDATE `profiles` SET `avator` = '" + avator + "' WHERE `id` = '"+ profileId +"'";
           
                                var query = con.query(sql, function(err, result) {
                                    // res.redirect('profile/'+result.insertId);
                                });
                            });
                    } else {
                      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                     //  res.render('index.ejs',{message: message});
                     }
                  }

                  if(image1){
                     var pic1 = image1.name;
                     // console.log(propic);
                     if(image1.mimetype == "image/jpeg" ||image1.mimetype == "image/png"||image1.mimetype == "image/gif" ){
                        image1.mv('public/images/upload_images/'+image1.name, function(err) {
                           if (err)
                             return res.status(500).send(err);
                               var sql = "UPDATE `profiles` SET `image1` = '" + pic1 + "' WHERE `id` = '"+ profileId +"'";
           
                                var query = con.query(sql, function(err, result) {
                                    // res.redirect('profile/'+result.insertId);
                                });
                            });
                    } else {
                      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                     //  res.render('index.ejs',{message: message});
                     }
                  }
                  if(image2){
                     var pic2 = image2.name;
                     // console.log(propic);
                     if(image2.mimetype == "image/jpeg" ||image2.mimetype == "image/png"||image2.mimetype == "image/gif" ){
                        image2.mv('public/images/upload_images/'+image2.name, function(err) {
                           if (err)
                             return res.status(500).send(err);
                               var sql = "UPDATE `profiles` SET `image2` = '" + pic2 + "' WHERE `id` = '"+ profileId +"'";
           
                                var query = con.query(sql, function(err, result) {
                                    // res.redirect('profile/'+result.insertId);
                                });
                            });
                    } else {
                      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                     //  res.render('index.ejs',{message: message});
                     }
                  }

                  if(image3){
                     var pic3 = image3.name;
                     // console.log(propic);
                     if(image3.mimetype == "image/jpeg" ||image3.mimetype == "image/png"||image3.mimetype == "image/gif" ){
                        image3.mv('public/images/upload_images/'+image3.name, function(err) {
                           if (err)
                             return res.status(500).send(err);
                               var sql = "UPDATE `profiles` SET `image3` = '" + pic3 + "' WHERE `id` = '"+ profileId +"'";
           
                                var query = con.query(sql, function(err, result) {
                                    // res.redirect('profile/'+result.insertId);
                                });
                            });
                    } else {
                      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                     //  res.render('index.ejs',{message: message});
                     }
                  }

                  if(image4){
                     var pic4 = image4.name;
                     // console.log(propic);
                     if(image4.mimetype == "image/jpeg" ||image4.mimetype == "image/png"||image4.mimetype == "image/gif" ){
                        image4.mv('public/images/upload_images/'+image4.name, function(err) {
                           if (err)
                             return res.status(500).send(err);
                               var sql = "UPDATE `profiles` SET `image4` = '" + pic4 + "' WHERE `id` = '"+ profileId +"'";
           
                                var query = con.query(sql, function(err, result) {
                                    // res.redirect('profile/'+result.insertId);
                                });
                            });
                    } else {
                      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                     //  res.render('index.ejs',{message: message});
                     }
                  }

               }
               else{console.log(err)
               }
            });
         }
      res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
   }
   else
      res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message});
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
