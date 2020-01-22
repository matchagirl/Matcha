var app = require('express').Router();
var mysql      = require('mysql');
const con = require('../models/connection.js');
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');

app.post('/', function (require, response) {
    var email = sanitizer.sanitize(require.body.email);
    console.log(email);

    sql = `SELECT vcode FROM users WHERE email = '${email}'`;
    con.query(sql, function(err, results){
        if(err){
            message = err;
        } else if(results.length){
            var vcode = results[0].vcode;
            
            let transporter = nodemailer.createTransport({
                service: 'gmail.com',
                auth: {
                user: 'tmkhwana@student.wethinkcode.co.za',
                pass: 'Honeyberry@1'
                }
            });
            
            var mailOptions = {
                from: 'matcha@gmail.com',
                to: require.body.email,
                subject: 'reset password',
                html: `
                        <h1>Click below link to reset password!</h1>
                        <a href=http://localhost:3000/reset?email=${require.body.email}&vcode=${vcode}>Reset password<a>
                        `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
        }
    });
});

module.exports = app;


