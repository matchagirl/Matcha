var app = require('express').Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');

app.get('/', function (require, response) {
    var sql = 'select id from users where email = ? and vcode = ?';
    con.query(sql, [require.query.email, require.query.vcode], function(err, results){
        if(err){
            response.send(`error: ${err}`);
        } else if(results.length){
            var id = results[0].id;
            response.render('reset', {page: 'RESET', menuId:'RESET', id});
        } else {
            response.send(`Invalid or expired link`);
        }
    });
});

app.post('/', (require, response) => {
    var id = require.body.id;
    var sql = 'update users set password = ? where id = ?';
    con.query(sql, [require.body.pass1,id], (err, res) => {
        if(err){
            response.send(`error: ${err}`);
        } else if(res.length){
            var id = results[0].id;
            response.send(res);
        } else {
            console.log(res)
            response.render('reset', {page: 'RESET', menuId:'RESET', id, msg: res});
        }
    });
});

module.exports = app;