const mysql = require('mysql');



const host="localhost";
const port=3360;
const user="root";
const password="HONEYBERRY";
const database="testbase";
const socketPath = "/goinfre/tmkhwana/Desktop/MAMP/mysql/tmp/mysql.sock";

var conn = mysql.createConnection({
    host     : host,
    port     : port,
    user     : user,
    password : password,
    database : database,
    socketPath: socketPath
});

conn.connect((err) => { 
    if (err) throw err;
    console.log("database connected");
});

module.exports = conn;