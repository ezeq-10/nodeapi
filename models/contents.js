// File: models/contents.js

var mongoose = require('mongoose');
var	Schema	 = mongoose.Schema;
	
var contents_schema = new Schema({
	cid: 	Number,
	id: 	Number,
	lang: 	String,
	content:String	
});

module.exports = mongoose.model('contents', contents_schema);
