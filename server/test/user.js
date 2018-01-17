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
        Uid: null,
        Email: 'test_' + new Date().getTime().toString() + '@gmail.com',
        Password: 'test',
        Role: 'Standard',
        Firstname: 'Max',
        Lastname: 'Mustermann'
    }

    it('should create an user', function (done) {
        userModel.createNewUser(newUser, function(error, results){
            if (error) {
                done(error);
                return;
            }
            results.should.be.an('object');
            done();
        });
    });

    it('The created user can be found by its email', function (done) {
        userModel.getUserByEmail(newUser.Email, function(error, result){
            if (error) {
                done(error);
                return;
            }
            result.should.not.be.an('array');
            result.should.have.property('Uid');
            result.should.have.property('Password');
            result.should.have.property('Role').equal(newUser.Role);
            result.should.have.property('Email').equal(newUser.Email);
            result.should.have.property('Firstname').be.equal(newUser.Firstname);
            result.should.have.property('Lastname').equal(newUser.Lastname);
            newUser.Uid = result.Uid;
            done();
        });
    });

    it('The created user can be found by its ID', function (done) {
        userModel.getUserByID(newUser.Uid, function(error, result){
            if (error) {
                done(error);
                return;
            }
            result.should.not.be.an('array');
            result.should.have.property('Uid').be.equal(newUser.Uid);
            result.should.have.property('Role').equal(newUser.Role);
            result.should.have.property('Email').equal(newUser.Email);
            result.should.have.property('Firstname').be.equal(newUser.Firstname);
            result.should.have.property('Lastname').equal(newUser.Lastname);
            done();
        });
    });

    newUser.Firstname = 'Captain'; // update value of user

    it('The created user can be modified by its ID', function (done) {
        userModel.updateUserById(newUser, function(error, result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.Uid, function(error, result){
                if (error) {
                    done(error);
                    return;
                }
                result.should.not.be.an('array');
                result.should.have.property('Uid').be.equal(newUser.Uid);
                result.should.have.property('Role').equal(newUser.Role);
                result.should.have.property('Email').equal(newUser.Email);
                result.should.have.property('Firstname').be.equal(newUser.Firstname);
                result.should.have.property('Lastname').equal(newUser.Lastname);
                done();
            });
            
        });
    });

    newUser.Lastname = 'America'; // update value of user

    it('The created user can be modified by its ID', function (done) {
        userModel.updateUserByEmail(newUser, function(error, result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.Uid, function(error, result){
                if (error) {
                    done(error);
                    return;
                }
                result.should.not.be.an('array');
                result.should.have.property('Uid').be.equal(newUser.Uid);
                result.should.have.property('Role').equal(newUser.Role);
                result.should.have.property('Email').equal(newUser.Email);
                result.should.have.property('Firstname').be.equal(newUser.Firstname);
                result.should.have.property('Lastname').equal(newUser.Lastname);
                done();
            });
            
        });
    });

    it('The created user can be deleted', function (done) {
        userModel.deleteUserById(newUser.Uid, function(error, del_result){
            if (error) {
                done(error);
                return;
            }
            userModel.getUserByID(newUser.Uid, function(error, get_id_result){
                if (error) {
                    done(error);
                    return;
                }
                expect(get_id_result, "Email result should be empty").to.be.an('undefined');

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
