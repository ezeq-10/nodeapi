// File: routes/contents.js

module.exports = function(app) {

	var contents = require('../models/contents.js');
	
	//GET - Return all data
	findAll = function(req, res) {
		console.log('findAll Method');
		
		contents.find(function(err, data) {
			if(!err) {
				if(!data) {
					res.statusCode = 404;
					return res.send({ error: 'Not found' });
				} else {
					res.send(data);
				}	
			} else {
				console.log('ERROR: ' + err);
			}
		});
		
	};
	
	
	//GET - Return a content with specified ID
	findById = function(req, res) {		
		console.log('findById Method [cid:'+ req.params.cid +'][id:'+ req.params.id +'][lang:'+ req.params.lang +']');
		
		contents.findOne({ cid: req.params.cid, id: req.params.id, lang: req.params.lang }, function(err, data) {
			if(!err) {
				if(!data) {
					res.statusCode = 404;
					return res.send({ error: 'Not found' });
				} else {
					res.send(data);
				}
			} else {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
		});
	};	
	
	
	//POST - Insert new
	addContent = function(req, res) {
		console.log('addContent Method [cid:'+ req.body.cid +'][id:'+ req.body.id +'][lang:'+ req.body.lang +'][content:'+ req.body.content +']');
		
		//Validation
		if((req.body.cid == undefined) || (req.body.id == undefined) || (req.body.lang == undefined) || (req.body.content == undefined)) {
			res.statusCode = 500;
			return res.send({ error: 'Empty params' });	
		}
				
		var content = new contents({
			cid:    	req.body.cid,
			id:     	req.body.id,
			lang:		req.body.lang,
			content:  	req.body.content
		});
		
		content.save(function(err) {
			if(!err) {
				res.statusCode = 200;
				return res.send();
			} else {
				res.statusCode = 500;
				return res.send({ error: 'Internal server error' });
			}
		});
	};
	
	
	//PUT - Update
	updateContent = function(req, res) {
		console.log('updateContent Method [cid:'+ req.params.cid +'][id:'+ req.params.id +'][lang:'+ req.params.lang +'][content:'+ req.body.content +']');
		
		//Validation
		if((req.params.cid == undefined) || (req.params.id == undefined) || (req.params.lang == undefined) || (req.body.content == undefined)) {
			res.statusCode = 500;
			return res.send({ error: 'Empty params' });	
		}
		
		contents.findOne({ cid: req.params.cid, id: req.params.id, lang: req.params.lang }, function(err, data) {
			
			if(data) {
			
				data.content = req.body.content;
			
				data.save(function(err) {
					if(!err) {
						res.statusCode = 200;
						return res.send();
					} else {
						res.statusCode = 500;
						return res.send({ error: 'Internal server error' });
					}			
				});
			} else {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });				
			}	
		});
	}
	
	
	//DELETE - Delete
	deleteContent = function(req, res) {
		console.log('deleteContent Method [cid:'+ req.params.cid +'][id:'+ req.params.id +'][lang:'+ req.params.lang +']');
		
		contents.findOne({ cid: req.params.cid, id: req.params.id, lang: req.params.lang }, function(err, data) {
			
			if(data) {
				data.remove(function(err) {
					if(!err) {
						res.statusCode = 200;
						return res.send();
					} else {
						res.statusCode = 500;
						return res.send({ error: 'Internal server error' });
					}
				});
			} else {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });				
			}			
		});				
	}
	
	
	//Link routes and functions
	app.get('/contents', findAll);
	app.get('/contents/:cid/:id/:lang', findById);
	app.post('/add', addContent);
	app.put('/update/:cid/:id/:lang', updateContent);
	app.delete('/delete/:cid/:id/:lang', deleteContent);
	
}
