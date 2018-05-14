var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 80));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/views/home.html");
});

app.get('/RayTracer', function(req, res){
	res.sendFile(__dirname + "/views/home.html");
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});
