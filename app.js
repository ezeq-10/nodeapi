// File: app.js

var express  = require('express'),
	app 	 = express(),
	http 	 = require('http'),
	url		 = require('url'),	   
	server   = http.createServer(app),
	mongoose = require('mongoose');
	

// express config	
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

});	 

// routes	
var routes = require('./routes/contents.js')(app);

// mongoose
mongoose.connect('mongodb://localhost/contents', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});


// server up
server.listen(3000, function() {
	console.log('Server running on http://localhost:3000');
});
