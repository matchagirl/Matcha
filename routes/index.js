var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Matcha' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET login page*/
router.get('/login', function(re, res, next){
  res.render('login', {page:'MATCHA', menuId:'MATCHA'});
});

/* GET reister page*/
router.get('/register', function(re, res, next){
  res.render('register', {page:'MATCHA', menuId:'MATCHA'});
});

module.exports = router;
