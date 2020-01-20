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
         res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data});
      }
     
      var sql="SELECT id, firstname, lastname, username FROM `users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
      con.query(sql, function(err, results){      
         if(results.length){
            sess.userId = results[0].id;
            sess.user = results[0];
            sess.loggedin = true;
            var sql = "SELECT*FROM `profiles` WHERE `userID` = '"+ sess.userId +"'";
               con.query(sql, function(err, results){
                  if (results.length){
                     sess.data = results[0];
                     // console.log(typeof sess.data)
                     var sql ="SELECT * FROM userinterest WHERE userId = '" + sess.userId + "'";
                     con.query(sql, function(err, results){
                        var userinterests = results;
                        const  inteId = [];
                        userinterests.forEach(function(iterm){
                           inteId.push(iterm.inteId);
                        });
                        // console.log(inteId);
                        var sql = "SELECT * FROM interest WHERE id in (?)";
                           con.query(sql, [[...inteId]], function(err, results){
                              var interest = results;
                              const  inte = [];
                              interest.forEach(function(iterm){
                                 inte.push(iterm.name);
                              });
                           //   var  inter = Object.assign({},inte);
                              sess.post = inte;
                              // console.log( typeof sess.post);
                              res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data, post: sess.post});
                           })
                     })
                     }
                     else
                        res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data, post: sess.post});
                     });
            // console.log(sess.userId);
            // console.log(sess.user.firstname);
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
   var data = sess.data;
   
   if(req.method == "POST"){
      
      // console.log("here");
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
      var BDSM = post.BDSM;
      var otherinterest = post.otherInterest;
      var file = req.files;
      if (file){
      var propic = req.files.avator;
      var image1 = req.files.image1;
      var image2 = req.files.image2;
      var image3 = req.files.image3;
      var image4 = req. files.image4;
   }
   
   // sess.post = req.body;
   // console.log(sess.post);


      var userID = sess.user.id;

      if (name){
         var sql="SELECT*FROM `users` WHERE `username`='"+name+"'";
         con.query(sql, function(err, results){
            // console.log(results);
            if (!results.length){
               
               var sql= "UPDATE `users` SET `username` ='"+name+"' WHERE id ='"+sess.user.id+"'";
               con.query(sql, function(err){
                  var sql = "SELECT*FROM `users` WHERE id = '"+sess.user.id+"'";
                  con.query(sql, function(err, results){
                     // console.log(results)
                     if(results.length){
                           sess.userId = results[0].id;
                           sess.user = results[0];
                           sess.loggedin = true;
                        //  console.log("nothing helps");
                        // console.log(sess.user);
                        res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     }
                     else{console.log(err)
                     }
                  });
                  if (err){console.log(err)};
               })
            }
            else{
                  message = "username already exist";
                  console.log("username already exist");
                  res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});

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
               res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
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
               res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
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
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' ,post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
                  }
                  else{console.log(err)
                  }
               });
            }
            else{
                  message = "email already exist";
                  console.log("email already exist");
                  res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});

            }
         });
      }
      
      if (extremeSport){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ extremeSport+"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + extremeSport + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
            }
         });
      }
      if (outdoor){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ outdoor+"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + outdoor + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
            }
         });
      }

      if (geekSport){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ geekSport+"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + geekSport + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
            }
         });
      }

      if (foodie){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ foodie +"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + foodie + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
            }
         });
      }

      if (BDSM){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ BDSM +"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + BDSM + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
            }
         });
      }

      if (otherinterest){
         var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ otherinterest +"'"
          con.query(sql, function(err, result) {
            if (result.length){
               // console.log(sess);
               var inteId = result[0].id;
               var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
               con.query(sql, function(err, result) {
                   if(err){
                     console.log(err);
                   }
               });
            }else {
               var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + otherinterest + "')";
                con.query(sql, function(err, result) {
                  var inteId = result.insertId;
                  var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                  con.query(sql, function(err, result) {
                      if(err){
                        console.log(err);
                      }
                  });
                  if(err){
                     console.log(err);
                  }
               });
            }
            if(err){
               console.log(err);
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
                  // // console.log(profileId);            
                  
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
                                var sql = "SELECT*FROM `profiles` WHERE `id` = '"+ profileId +"'";
                                var query = con.query(sql, function(err, results){
                                   if (results.length){
                                      sess.data = results[0];
                                    //   console.log(sess);
                                    //   alert("profile updated");
                                      res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
                                    }
                                })
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
            // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});

         }
         // console.log(sess.data);
         // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , userId : sess.userId, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
   }
   else
      res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
};

 //-----------------------------------------------profile update2------------------------------------------------------
 router.update2 = function(req, res) {
   var sess = req.session;
   // console.log(sess);
   var message = '';
   var data = sess.data;
   
   if(req.method == "POST"){
      
      // console.log("here");
      var post  = req.body;
      var gender= post.gender;
      var sexualpref= post.sexualpreference;
      var biography= post.biography[0];
      var extremeSport = post.extreme_sport;
      var outdoor = post.outdoor_activities;
      var geekSport = post.geek_sports;
      var foodie = post.foodie;
      var BDSM = post.BDSM;
      var otherinterest = post.otherInterest;
      var file = req.files;
      if (file){
      var propic = req.files.avator;
      var image1 = req.files.image1;
      var image2 = req.files.image2;
      var image3 = req.files.image3;
      var image4 = req. files.image4;
      };

      var profileId = sess.data.id;
      if (gender){
         var sql= "UPDATE `profiles` SET `gender` ='" +gender +"' WHERE id ='"+ profileId +"'";
         con.query(sql, function(err, results){
            var sql = "SELECT*FROM `profiles` WHERE `userID` = '"+ sess.userId +"'";
               con.query(sql, function(err, results){
                  if (results.length){
                     sess.data = results[0];
                     // console.log(typeof sess.data)
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                  }
                     else
                        res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
               });
         })
      }

      if (sexualpref){
         var sql= "UPDATE `profiles` SET `sexualpref` ='" + sexualpref +"' WHERE id ='"+ profileId +"'";
         con.query(sql, function(err, results){
            var sql = "SELECT*FROM `profiles` WHERE `userID` = '"+ sess.userId +"'";
               con.query(sql, function(err, results){
                  if (results.length){
                     sess.data = results[0];
                     // console.log(typeof sess.data)
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                  }
                     else
                        res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
               });
         })

      }

      if (biography){
         var sql= "UPDATE `profiles` SET `biography` ='" + biography +"' WHERE id ='"+ profileId +"'";
         con.query(sql, function(err, results){
            var sql = "SELECT*FROM `profiles` WHERE `userID` = '"+ sess.userId +"'";
               con.query(sql, function(err, results){
                  if (results.length){
                     sess.data = results[0];
                     // console.log(typeof sess.data)
                     res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                  }
                     else
                        res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
               });
         })
      }

      if (extremeSport || outdoor || geekSport || foodie || BDSM || otherinterest){
         var sql = "DELETE FROM userinterest WHERE  userID = '"+ sess.userId +"'";
         con.query(sql, function(err, result){
            if (extremeSport){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ extremeSport+"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + extremeSport + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                        });
                        if(err){
                           console.log(err);
                        }
                     });
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
             if (outdoor){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ outdoor+"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + outdoor + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        });
                        if(err){
                           console.log(err);
                        }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
      
            if (geekSport){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ geekSport+"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + geekSport + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        });
                        if(err){
                           console.log(err);
                        }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
      
            if (foodie){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ foodie +"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});                         
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + foodie + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        });
                        if(err){
                           console.log(err);
                        }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
      
            if (BDSM){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ BDSM +"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + BDSM + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        });
                        if(err){
                           console.log(err);
                        }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                     });
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
      
             if (otherinterest){
               var sql = "SELECT* FROM `interest` WHERE  `name` = '"+ otherinterest +"'"
                con.query(sql, function(err, result) {
                  if (result.length){
                     // console.log(sess);
                     var inteId = result[0].id;
                     var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                     con.query(sql, function(err, result) {
                         if(err){
                           console.log(err);
                         }
                        // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});                         
                     });
                  }else {
                     var sql = "INSERT INTO  `interest` (`name`) VALUES ( '" + otherinterest + "')";
                      con.query(sql, function(err, result) {
                        var inteId = result.insertId;
                        var sql = "INSERT INTO  `userinterest` (`userId`, `inteId`) VALUES ( '" + sess.userId+ "', '"+ inteId +"')";
                        con.query(sql, function(err, result) {
                            if(err){
                              console.log(err);
                            }
                        });
                        if(err){
                           console.log(err);
                        }
                     });
                     // res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
                  }
                  if(err){
                     console.log(err);
                  }
               });
            }
            res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data : sess.data});
         })

      }
      if (file){
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
                       var sql = "SELECT*FROM `profiles` WHERE `id` = '"+ profileId +"'";
                       var query = con.query(sql, function(err, results){
                          if (results.length){
                             sess.data = results[0];
                           //   console.log(sess);
                           //   alert("profile updated");
                             res.render('profile', {page:'MATCHA', menuId:'MATCHA' , post : sess.post, firstname: sess.user.firstname, lastname: sess.user.lastname, username: sess.user.username, message: message, data: sess.data});
                           }
                       })
                   });
           } else {
             message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            //  res.render('index.ejs',{message: message});
            }

         }

      }
   
   }
};

// //-----------------------------------------------logout------------------------------------------------------------
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
