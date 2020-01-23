// var express = require('express');
// var router  = express.Router();
// const con   = require('../models/connection.js');

// // exports.signup = function(req, res){
// //     message= '';
// // if(req.method == "GET"){
// //     message = '';
// //     var post  = req.body;
// //     var name= post.user_name;
// //     var vcode= post.vcode;
// //     var active = 1;

// //     // router.get('/', function(req, res) {
// //         if (post.user_name == '' || post.vcode == '') {
// //              message = "User doesnt exist!"
// //             res.render('signup.ejs', {message: message});
// //         }
// //         if (vcode){
// //              var sql= "UPDATE `users` SET `active`  WHERE vcode ='"+vcode+"'";
// //             con.query(sql, function(err){
// //                 if (err){console.log(err)};
// //         })
// //             message = "Your account has been activated";
// //             res.render('activated.ejs', {error:message});
    
// //         } else {
// //     res.render('signup');
// //     };
// // }
// //     )};
// // }
// module.exports = router;