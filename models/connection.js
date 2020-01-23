const mysql = require('mysql');

const host="localhost";
const port=3500;
const user="root";
const password="1792fd";
const database="matcha";
const socketPath = "/Applications/mampstack-7.3.11-0/mysql/tmp/mysql.sock"

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