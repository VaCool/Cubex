var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql      = require('mysql');
var multer = require("multer");
var fs = require("fs");
var namefile;
var connection = mysql.createConnection({
  	host     : 'localhost',
 	user     : 'root',
  	password : 'root',
  	database : 'vafood'
});
var storageOfPizza = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/Pizza/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        namefile = "img/pizza/" + file.originalname;
    }
});
var uploadPizza = multer({ storage: storageOfPizza });
app.use(bodyParser.urlencoded({ extended: false }));
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

/// pizza
app.get('/pizza', function (req, res, next) {
  connection.query('SELECT *  FROM pizza;', 
  function (error, results, fields) {
     if (error) throw error;
	   res.send(results);
  });
});

app.post('/delpizza', function (req, res) {
  fs.unlink(req.body.URL, function (err) {
    if (err) throw err;
    console.log("file deleted");
  });
  connection.query("DELETE FROM `pizza` WHERE `pizza_id`=" + req.body.pizza_id + ";", 
  function (error, results, fields) {
    if (error) throw error;
  });
});

app.post('/uploadPizza', uploadPizza.single('fileupload-input'), function(req, res, next) {
  var categories = "all ";
  if(req.body.first == "on"){
    categories = categories + " " + "first";
  }
  if (req.body.second == "on"){
    categories = categories + " " + "second";
  }
  if (req.body.popular == "on"){
    categories = categories + " " + "popular";
  }   
  if (req.body.new == "on"){
    categories = categories + " " + "new";
  }
  connection.query("INSERT INTO pizza VALUES(NULL, '" + req.body.name + "', '" + req.body.weight + "', '" + 
                   req.body.price + "', '" + namefile + "', '" + req.body.consist + "', '" + categories + "');", 
  function (error, results, fields) {
    if (error) throw error;
  });
  res.send('ok')
});

app.post('/pizzaChange', function (req, res) {
  connection.query("UPDATE pizza  SET  name = '" + req.body.name + "', weight = '" + req.body.weight + "', price = '" + 
                   req.body.price + "', consist = '" + req.body.consist +"', categories = '" + req.body.categories + 
                   "' WHERE pizza_id = " + req.body.pizza_id +";", 
  function (error, results, fields) {
    if (error) throw error;
  });
   res.send('ok')
});
