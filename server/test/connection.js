process.env.NODE_ENV = 'test';
/* test module */
var debug = require('debug')('test');
var chai = require('chai');
var server = require('../app')
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

/* sql connection */
var testModel = require('../models/test');
describe('Connect to SQL database', function () {
    it('should connect to database and return a solution', function (done) {
        testModel.testSql(function(error, result){
            if (error) {
                done(error);
                return;
            }
            expect(result, "result is an array.").to.be.an('array');
            expect(result[0], "a solution must exist.").to.have.property('solution');
            expect(result[0].solution, "the solution is 1.").to.be.equal(1);
            done();
        });
    });
});