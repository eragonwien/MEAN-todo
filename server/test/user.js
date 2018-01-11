process.env.NODE_ENV = 'test';

var user = require('../models/user');
var chai = require('chai');
var server = require('../app')
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('GET first User', function() {
    it('It should GET the first user', function (done) {
        chai.request(server)
        .get('/users/1')
        .end(function (error, result) {
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.be.a('array');
            result.body[0].should.have.property('Role');
            result.body[0].Role.should.have.equal('Admin');
            result.body[0].Firstname.should.have.equal('Stephen');
            result.body[0].Lastname.should.have.equal('Strange');
            done();
        });
    });
  });