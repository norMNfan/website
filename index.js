var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 80));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/views/home.html");
});

app.get('/Projects', function(req, res) {
	res.sendFile(__dirname + "/views/projects.html");
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
