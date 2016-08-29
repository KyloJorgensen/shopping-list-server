var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/server.js'),
    Item = require('../server/api/item/item.model'),
    should = chai.should(),
    app = server.app;
    // storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {

    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });


    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/item')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    var testId = 0,
        storage;

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/item')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                testId = res.body._id;
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                done();
            });
    });

    it('should edit an items name on put', function(done) {
    	chai.request(app)
    		.put('/item')
    		.send({'id': testId, 'newName': 'Greens'})
    		.end(function(err, res) {
    			should.equal(err, null);
    			done();
       		});
    });

    it('should delete an item on delete', function(done) {
    	chai.request(app)
    		.delete('/item/' + testId)
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Greens');
                res.body._id.should.equal(testId);
    			done();
    		});
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});