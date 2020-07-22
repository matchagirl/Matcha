var express = require('express');
var router = express.Router();
const con = require('../models/connection.js');
var nodemailer = require('nodemailer');

function sendEmail(name, email) {
    var text = "Hello there "  + name + " sent you a  new chat massege on your  matcha profile"
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'matchamatch2@gmail.com',
        pass: 'matchme@123'
      }
    });
    mailOptions = {
      from: '"Matcha" <mmodisad@student.wethinkcode.co.za>',
      to: email,
      subject: 'Matcha chat Notification',
      text: text,
      html: '<a>' + text + '</a>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }

router.post("/send", (req, res) => {
    let sender = req.body.sen;
    let receiver = req.body.rec;
    let msg = req.body.msg;
    console.log(receiver);
    let date = new Date().toISOString().slice(0, 19);
    let sql = `INSERT INTO chats (sender, receiver, message, date) VALUES ('${sender}', '${receiver}', '${msg}', '${date}')`;
    con.query(sql, function(err, results){
        if (err){
            console.log(err);
            res.send(["failed"]);
        } else {
            sql = `SELECT email FROM users WHERE username = "${receiver}"`;
            con.query(sql, function(err, result){
                if (err){
                    res.send(["failed"]);
                }else{
                    var email = result[0].email;
                    sendEmail(sender,email);
                    res.send(["Sent"]);
                }
            });
        }
    });
});

router.post("/fetch", (req, res) => {
    let sender = req.body.sen;
    let receiver = req.body.rec;
    let sql = `SELECT * FROM chats WHERE (sender = "${sender}" AND receiver = "${receiver}") OR (receiver = "${sender}" AND sender = "${receiver}") ORDER BY date ASC`;
    con.query(sql, function(err, results){
        res.send(results);
    });
});

router.post("/fetchLatest", (req, res) => {
    let sender = req.body.sen;
    let receiver = req.body.rec;
    let date = new Date();
    date.setSeconds(date.getSeconds() - 2);
    date = date.toISOString().slice(0, 19);
    let sql = `SELECT * FROM chats WHERE (sender = "${sender}" AND receiver = "${receiver}" AND date > "${date}") OR (receiver = "${sender}" AND sender = "${receiver}" AND date > "${date}") ORDER BY date ASC`;
    con.query(sql, function(err, results){
        if(err)
            res.send([]);
        else
            res.send(results);
    });
});

module.exports = router;