const mysql = require('mysql');


const host="localhost";
const port=8080;
const user="root";
const password="";
const database="MATCHA";
//const socketPath = "";
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    socketPath: "",
    database: "MATCHA"
   // socketPath: socketPath
});

conn.connect((err) => { 
    if (err) throw err;
    console.log("database connected");
});

module.exports = conn;