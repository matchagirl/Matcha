const mysql = require('mysql');
var express = require('express');
var app = express();


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lmnyamen",
    socketPath: "/goinfre/lmnyamen/Desktop/MAMP/mysql/tmp/mysql.sock"

  });

  const db ="matcha";
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS testbase", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
  
  module.exports = con;


