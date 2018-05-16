var express = require('express');
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream');
var morgan = require('morgan');

// Start NodeJS app
var app = express();

var logDirectory = path.join(__dirname, 'log');
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
 
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

//Set up port connection
app.set('port', (process.env.PORT || 80));

// Set up root directory path
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/views/home.html");
});

app.get('/Projects', function(req, res) {
	res.sendFile(__dirname + "/views/projects.html");
});

app.get('/Projects/RayTracer', function(req, res) {
	res.sendFile(__dirname + "/views/raytracer.html");
});

app.get('/Travel', function(req, res) {
	res.sendFile(__dirname + "/views/travel.html");
});

app.get('/Travel/Philippines', function(req, res) {
	res.sendFile(__dirname + "/views/philippines.html");
});

app.get('/Travel/Germany', function(req, res) {
	res.sendFile(__dirname + "/views/germany.html");
});

app.get('/Books', function(req, res) {
	res.sendFile(__dirname + "/views/books.html");
});

app.get('/Projects/RayTracer', function(req, res){
	res.sendFile(__dirname + "/views/home.html");
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});
