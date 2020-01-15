 const con = require('./connection.js');


 var sql = "CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,\
    username VARCHAR(255) NOT NULL,\
    firstname VARCHAR(255) NOT NULL,\
    lastname VARCHAR(255) NOT NULL,\
     email VARCHAR(255) NOT NULL,\
     password VARCHAR(255) NOT NULL,\
     active INT NOT NULL DEFAULT '0',\
     vcode VARCHAR(255))"
 con.query(sql, function(err, result){
    if (err)  throw err;
    console.log("Table users created");
 });

 con.query(`CREATE TABLE IF NOT EXISTS profiles(id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,\
   userID int(11) NOT NULL,\
   gender varchar(100) ,\
   sexualpref varchar(100) ,\
   biography varchar(255) ,\
   extremeSport int(11) ,\
   outdoor int(11) ,\
   geekSport int(11) ,\
   foodie int(11) ,\
   BDSM int(11) ,\
   avator varchar(255) ,\
   image1 varchar(255) ,\
   image2 varchar(255) ,\
   image3 varchar(255) ,\
   image4 varchar(255) \
)`, (err, result) => {
   if (err) throw err;
   console.log("Table profiles created");
});