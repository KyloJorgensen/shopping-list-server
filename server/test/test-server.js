var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/shoppingList')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/item')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                res.body[3].should.have.property('name');
                res.body[3].should.have.property('id');
                res.body[3].name.should.be.a('string');
                res.body[3].id.should.be.a('number');
                res.body[3].name.should.equal('Kale');
                storage.should.be.a('array');
                storage.should.have.length(4);
                storage[3].should.be.a('object');
                storage[3].should.have.property('id');
                storage[3].should.have.property('name');
                storage[3].id.should.be.a('number');
                storage[3].name.should.be.a('string');
                storage[3].name.should.equal('Kale');
                done();
            });
    });

    it('should edit an items name on put', function(done) {
    	chai.request(app)
    		.put('/item')
    		.send({'id': 4, 'newName': 'Greens'})
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                res.body[3].should.have.property('name');
                res.body[3].should.have.property('id');
                res.body[3].name.should.be.a('string');
                res.body[3].id.should.be.a('number');
                res.body[3].name.should.equal('Greens');
                storage.should.be.a('array');
                storage.should.have.length(4);
                storage[3].should.be.a('object');
                storage[3].should.have.property('id');
                storage[3].should.have.property('name');
                storage[3].id.should.be.a('number');
                storage[3].name.should.be.a('string');
                storage[3].name.should.equal('Greens');
    			done();
       		});
    });

    it('should delete an item on delete', function(done) {
    	chai.request(app)
    		.delete('/item')
    		.send({'id': 4})
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                storage.should.be.a('array');
                storage.should.have.length(3);
    			done();
    		});
    });
});

describe('Shopping List', function() {
    it('should list items on get');
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
});