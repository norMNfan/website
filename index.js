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
app.set('port', (process.env.PORT || HTTP_PORT));

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
const options = {
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

app.enable('trust proxy');

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

/*
var server = app.listen(port, function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});
*/

https.createServer(options, app).listen(HTTPS_PORT).on('listening', function() {
  return console.log("HTTP to HTTPS redirect app launched.");
});