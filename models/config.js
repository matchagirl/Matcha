const mysql = require('mysql');
var express = require('express');
var app = express();


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    socketPath: ""

  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS MATCHA", function (err, result) {
      if (err) throw err;
      console.log("Database created");
      process.exit();
    });
  });
  
  module.exports = con;


