var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Matcha' });
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {page:'MATCHA', menuId:'MATCHA'});
// });

/* GET login page*/
router.get('/login', function(re, res, next){
  res.render('login', {page:'MATCHA', menuId:'MATCHA'});
});

router.login = function(req, res){
  var message;
  var sess = req.session; 

  // if (sess.loggedin){   
  //    res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data});
  // }

  if(req.method == "POST"){
     var post  = req.body;
     var name= post.username;
     var unhash_pass= post.password;
    
     var sql = `SELECT password FROM users WHERE username = '${name}' AND active = 1`;

     //gets the hashed password using the username
     con.query(sql, function(err, results){
        var hash_pass;
        if (err){
           message = err;
           res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
        } else if (results.length){
           hash_pass = results[0].password;

           //compares hashed and unhashed passwrds to see if they match then return true if they are and false if they are not
           bcrypt.compare(unhash_pass, hash_pass, function(err, results) {
              if (err){
                 message = err;
                 res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
              } else if (results){
                 var sql = `SELECT id, firstname, lastname, username FROM users WHERE username = '${name}'`;
                 con.query(sql, function(err, results){
                    if (err){
                       message = err;
                       res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
                    } else {
                       sess.userId = results[0].id;
                       sess.user = results[0];
                       sess.loggedin = true;
                       var sql = `SELECT*FROM profiles WHERE userID = '${sess.userId}'`;
                       con.query(sql, function(err, results){
                          if (err){
                             message = err;
                             res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
                          } else if(results.length) {
                             sess.data = results[0];
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
                              sess.post = inte;
                              var sql = "SELECT* FROM userinterest WHERE inteId in (?)";
                                 con.query(sql, [[...inteId]], function(err, results){
                                    var peepz = results;
                                    // console.log(peepz);
                                    const users = [];
                                    peepz.forEach(function(iterm){
                                       users.push(iterm.userId);
                                    })
                                    var sql = "SELECT*FROM users WHERE id in (?)";
                                       con.query(sql, [[...users]], function(err, results){
                                          var suggest = results;
                                          // console.log(suggest);
                                          sess.suggest = suggest;
                                          // console.log(sess);
                                          res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data, post: sess.post, suggest: sess.suggest});
                                       })
                                 })
                           //   var  inter = Object.assign({},inte);
                           })
                     })  
                           //   res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data});
                          }
                          else
                           res.render('homepage', {page:'MATCHA', menuId:'MATCHA', username : sess.user.username, data: sess.data, post: sess.post, suggest: []});

                       });
                    }
                 });
              } else {
                 message = 'invalid login details';
                 res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
              }
           });
        } else {
           message = 'invalid login details';
           res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
        }
     });
  } else {
     message = 'an error occured';
     res.render('login', {page: 'MATCHA', menuId:'MATCHA', msg: message});
  }
};

module.exports = router;
