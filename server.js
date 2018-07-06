var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  	host     : 'localhost',
 	user     : 'root',
  	password : 'root',
  	database : 'vafood'
});

app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000);
console.log('server is start');

app.post('/registration', function (req, res) {
	var login;
	connection.query("SELECT login FROM client WHERE login = '" + req.body.login + "';", 
	function (error, results, fields) {
  		if (error) throw error;
  		results.forEach(function(results) {
  			login =  results.login;	
  		});	
  			if(login === req.body.login){
  				res.send('Пользователь с таким логином уже сущестует!')
  			}
  			else{
  				console.log(req.body.verification);
				connection.query("INSERT INTO client VALUES(NULL, '" + req.body.name + "', '" + req.body.login + "', '" + req.body.password + "', '" + 
				req.body.phone + "', NULL, '"+ req.body.email  + "', '" + req.body.verification  + "');", 
				function (error, results, fields) {
  					if (error) throw error;
				});
  			 	res.send('Регистрация прошла успешно')
			}
	});
});

app.post('/login', function (req, res) {
	var login;
	var password;
	console.log(req.body.login);
	console.log(req.body.password);
	connection.query("SELECT login, password, verification, rights, name, client_id FROM client WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "';", 
	function (error, results, fields) {
  		if (error) throw error;
  		results.forEach(function(results) {
  			login =  results.login;
  			password = results.password;
  		});	
  			if(login === req.body.login && password === req.body.password){
  				console.log(results);
  				res.send(results)
  			}
  			else{
  				console.log(req.body.password);
  			 	res.send('Не верно введен логин или пароль!');
			}
	});
});