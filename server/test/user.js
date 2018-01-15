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
            result.should.be.an('array');
            result[0].should.have.property('solution');
            result[0].solution.should.be.equal(1);
            done();
        });
    });
});

var userModel = require('../models/user');
describe('User', function () {
    var newUser = {
        id: null,
        email: 'test_' + new Date().getTime().toString(),
        password: 'test',
        role: 'Standard',
        firstname: 'test',
        lastname: 'case'
    }

    it('should create an user', function (done) {
        userModel.CreateNewUser(newUser, function(error, results){
            if (error) {
                done(error);
                return;
            }
            results.should.be.an('object');
            done();
        });
    });

    it('The created user can be found by its email', function (done) {
        userModel.getUserByEmail(newUser.email, function(error, result){
            if (error) {
                done(error);
                return;
            }
            result.should.not.be.an('array');
            result.should.have.property('Uid');
            result.should.have.property('Password');
            result.should.have.property('Role').equal(newUser.role);
            result.should.have.property('Email').equal(newUser.email);
            result.should.have.property('Firstname').be.equal(newUser.firstname);
            result.should.have.property('Lastname').equal(newUser.lastname);
            newUser.id = result.Uid;
            done();
        });
    });

    it('The created user can be found by its ID', function (done) {
        userModel.getUserByID(newUser.id, function(error, result){
            if (error) {
                done(error);
                return;
            }
            result.should.not.be.an('array');
            result.should.have.property('Uid').be.equal(newUser.id);
            result.should.have.property('Role').equal(newUser.role);
            result.should.have.property('Email').equal(newUser.email);
            result.should.have.property('Firstname').be.equal(newUser.firstname);
            result.should.have.property('Lastname').equal(newUser.lastname);
            done();
        });
    });

    newUser.firstname = 'Captain'; // update value of user

    it('The created user can be modified by its ID', function (done) {
        userModel.UpdateUserById(newUser, function(error, result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.id, function(error, result){
                if (error) {
                    done(error);
                    return;
                }
                result.should.not.be.an('array');
                result.should.have.property('Uid').be.equal(newUser.id);
                result.should.have.property('Role').equal(newUser.role);
                result.should.have.property('Email').equal(newUser.email);
                result.should.have.property('Firstname').be.equal(newUser.firstname);
                result.should.have.property('Lastname').equal(newUser.lastname);
                done();
            });
            
        });
    });

    newUser.lastname = 'America'; // update value of user

    it('The created user can be modified by its ID', function (done) {
        userModel.UpdateUserByEmail(newUser, function(error, result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.id, function(error, result){
                if (error) {
                    done(error);
                    return;
                }
                result.should.not.be.an('array');
                result.should.have.property('Uid').be.equal(newUser.id);
                result.should.have.property('Role').equal(newUser.role);
                result.should.have.property('Email').equal(newUser.email);
                result.should.have.property('Firstname').be.equal(newUser.firstname);
                result.should.have.property('Lastname').equal(newUser.lastname);
                done();
            });
            
        });
    });

    it('The created user can be deleted', function (done) {
        userModel.DeleteUserById(newUser.id, function(error, del_result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.id, function(error, get_id_result){
                if (error) {
                    done(error);
                    return;
                }
                expect(get_id_result, "email result should be empty").to.be.an('undefined');

                userModel.getUserByEmail(newUser.email, function(error, get_email_result){
                    if (error) {
                        done(error);
                        return;
                    }
                    expect(get_email_result, "email result should be empty").to.be.an('undefined');
                    done();
                });
            });
        });
    });
});
