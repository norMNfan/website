var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var HTTP_PORT = 80;
var HTTPS_PORT = 443;

// Start NodeJS app
var app = express();

//Set up port connection
var ports = (process.env.PORT || process.env.VCAP_APP_PORT || HTTPS_PORT || HTTP_PORT);

app.all('/*', function(req, res, next) {
  if (/^http$/.test(req.protocol)) {
    var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any
    if ((HTTPS_PORT != null) && HTTPS_PORT !== 443) {
      return res.redirect("https://" + host + ":" + HTTPS_PORT + req.url, 301);
    } else {
      return res.redirect("https://" + host + req.url, 301);
    }
  } else {
    return next();
  }
});

// Set up root directory path
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Allow server to serve hidden files
app.use(express.static('static'));

// Options for HTTPS
const credentials = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(HTTP_PORT);
httpsServer.listen(HTTPS_PORT);