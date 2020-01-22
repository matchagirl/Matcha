var app = require('express').Router();
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');

app.post('/', function (require, response) {
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail.com',
    //     auth: {
    //        user: 'tmkhwana@student.wethinkcode.co.za',
    //        pass: 'Honeyberry@1'
    //     }
    // });
    
    // var mailOptions = {
    //     from: 'matcha@gmail.com',
    //     to: require.body.email,
    //     subject: require.body.subject,
    //     text: require.body.message,
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    //     console.log(error);
    // } else {
    //     console.log('Email sent: ' + info.response);
    // }
    // });
});

module.exports = app;