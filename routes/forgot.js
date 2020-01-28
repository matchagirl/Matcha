var app = require('express').Router();
const con = require('../models/connection.js');
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');



app.post('/', function (require, response) {
    var email = sanitizer.sanitize(require.body.email);

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
                        <a href=http://localhost:3001/reset?email=${require.body.email}&vcode=${vcode}>Reset password<a>
                        `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                response.send(error);
            } else {
                response.send(`<p><strong>Please check your email for further instructions</strong></p>`);
            }
            });
        } else {
            response.send(email + ' does not exist');
        }
    });
});

module.exports = app;


