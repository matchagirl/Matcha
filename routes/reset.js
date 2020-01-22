var app = require('express').Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');

app.get('/', function (require, response) {
    var vcode = require.query.vcode;
    var sql = 'select id from users where email = ? and vcode = ?';
    con.query(sql, [require.query.email, require.query.vcode], function(err, results){
        if(err){
            response.send(`error: ${err}`);
        } else if(results.length){
            response.send(`vcode: ${require.query.vcode}<br > email: ${require.query.email}`);
        } else {
            response.send(`Invalid or expired link`);
        }
    });
});

module.exports = app;