var express = require('express');
var router = express.Router();
const con = require('../models/connection.js');

router.post("/send", (req, res) => {
    let sender = req.body.sen;
    let receiver = req.body.rec;
    let msg = req.body.msg;
    let date = new Date().toISOString().slice(0, 19);
    let sql = `INSERT INTO chats (sender, receiver, message, date) VALUES ('${sender}', '${receiver}', '${msg}', '${date}')`;
    con.query(sql, function(err, results){
        if (err){
            console.log(err);
            res.send(["failed"]);
        } else {
            sql = `INSERT INTO notifications (sender, receiver, type) VALUES ('${receiver}', '${sender}', 'message')`;
            con.query(sql, function(err, result){
                if (err){
                    res.send(["failed"]);
                }
                res.send(["Sent"]);
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