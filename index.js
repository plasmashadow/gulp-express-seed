var express = require('express');
var subdomain = require('express-subdomain');
var bodyParser = require('body-parser');

var app = express();
// importing mongoose
var mongoose = require('mongoose')

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
// app.set('view engine', 'ejs');
// make express look in the public directory for assets (css/js/img)
app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
	res.sendfile(__dirname+'/views/index.html');
});



app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
