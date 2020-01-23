const con = require('./connection.js');


var sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL,lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, active INT NOT NULL DEFAULT '0', vcode VARCHAR(255))"
con.query(sql, function(err, result){
   if (err)  throw err;
   console.log("Table users created");
});