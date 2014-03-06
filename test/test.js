var should = require('should'); 
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var url = 'http://localhost:3000';

describe('Test Suite', function() {
	
    before(function(done) {
        mongoose.connect('mongodb://localhost/contents', function(err) {
            if (err) throw err;
            done();
        });
    });
    
    describe('Routing', function() {
		it('Should response 404 when try to access to /', function(done) {
			request(url)
				.get('/')
				//.set('Accept', 'application/json')
				.expect(404)
				.end(function(err, res) {
					 if (err) throw err;
					 done();
				});				
		});
	});
		
	describe('Get data', function() {
		it('Should response 200 to get all data', function(done) {
			request(url)
				.get('/contents')
				//.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, res) {
					 if (err) throw err;
					 done();
				});				
		});		
		it('Should response 404 when content not exists', function(done) {
			request(url)
				.get('/contents/0/0/0')
				//.set('Accept', 'application/json')
				.expect(404)
				.end(function(err, res) {
					 if (err) throw err;
					 done();
				});				
		});
		it('Should response 200 when content exists', function(done) {
			request(url)
				.get('/contents/1/1/es')
				//.set('Accept', 'application/json')
				.expect(200)
				.end(function(err, res) {
					 if (err) throw err;
					 done();
				});				
		});
		
	});
    
    
    describe('Set data', function() {
		it('Should response 500 when params are empty', function(done) {
			request(url)
				.post('/add')
				.send()
				.expect(500)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});		
		it('Should response 200 when data is saved', function(done) {
			request(url)
				.post('/add')
				.send({cid: '1', id: '2', lang: 'es', content: 'test content'})
				.expect(200)
				.end(function(err, res) {
					 if (err) throw err;
					 done();
				});				
		});		
	});
	
	
	describe('Update data', function() {
		it('Should response 404 when params are empty', function(done) {
			request(url)
				.put('/update')
				.send()
				.expect(404)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});
		it('Should response 500 when content is empty', function(done) {
			request(url)
				.put('/update/1/2/fr')
				.send()
				.expect(500)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});		
		it('Should response 404 when content not exists', function(done) {
			request(url)
				.put('/update/0/0/0')
				.send({content: 'nothing'})
				.expect(404)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});
		it('Should response 200 when data is updated', function(done) {
			request(url)
				.put('/update/1/2/es')
				.send({content: 'new'})
				.expect(200)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});
	});
	
   
    describe('Delete data', function() {
		it('Should response 404 when params are empty', function(done) {
			request(url)
				.del('/delete')
				.expect(404)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});			
		it('Should response 404 when content not exists', function(done) {
			request(url)
				.del('/delete/0/0/0')
				.expect(404)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});
		it('Should response 200 when data is deleted', function(done) {
			request(url)
				.del('/delete/1/2/es')
				.expect(200)
				.end(function(err, res) {
					if (err) throw err;
					done();
				});				
		});		 		
	});
});



  
  
  

