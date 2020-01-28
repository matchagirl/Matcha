var app = require('express').Router();
const con = require('../models/connection.js');
var passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
var schema = new passwordValidator();

app.get('/', function (require, response) {
    var sql = 'select id from users where email = ? and vcode = ?';
    con.query(sql, [require.query.email, require.query.vcode], function(err, results){
        if(err){
            response.send(`error: ${err}`);
        } else if(results.length){
            var id = results[0].id;
            response.render('reset', {page: 'RESET', menuId:'RESET', id});
        } else {
            response.send(`Invalid or expired link`);
        }
    });
});

app.post('/', (require, response) => {
    var id = require.body.id,
        pass1 = require.body.pass1,
        pass2 = require.body.pass2;

    schema
        .is().min(6)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();

    if (pass1 !== pass2){
        response.render('reset', {page: 'RESET', menuId:'RESET', id, msg: 'Passwords do not match'});
    } else if (schema.validate(pass1) === false) {
        msg = `Password needs to meet: ${schema.validate(pass1, { list: true })}`;
        response.render('reset', {page: 'RESET', menuId:'RESET', id, msg});
    } else {
        const saltRounds = 10;
        bcrypt.hash(pass1, saltRounds, function(err, hash) {
            if (err){
                msg = err;
                response.render('reset', {page: 'RESET', menuId:'RESET', id, msg});
            } else {
                var pass = hash;
                var sql = 'update users set password = ? where id = ?';
                con.query(sql, [pass,id], (err, res) => {
                    if(err){
                        response.send(`error: ${err}`);
                    } else {
                        var sql = 'update users set vcode = ? where id = ?';
                        con.query(sql, [null,id], (err, res) => {});
                        response.render('login', {page: 'LOGIN', menuId:'LOGIN', msg: 'Password updated successfully'});
                    }
                });
            }
        });
    } 
});

module.exports = app;