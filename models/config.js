const mysql = require('mysql');
var express = require('express');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1792fd",
  socketPath: "/Applications/mampstack-7.3.11-0/mysql/tmp/mysql.sock"
});

const db ="matcha";

con.connect(function(err) {
  if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, result) {
  if (err) throw err;
    console.log("Database created");
  });
});

module.exports = con;