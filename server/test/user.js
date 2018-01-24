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
            expect(result, "result is an array.").not.to.be.an('array');
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

describe('CRUD operations of users', function () {
    it('production mode is turned off', function (done) {
        expect(process.env.NODE_ENV, "production mode is turned off").not.to.be.equal('production');
        done();
    });
    var newUser = {
        Uid: null,
        Email: 'test_' + new Date().getTime().toString() + '@gmail.com',
        Password: 'test',
        Role: 'Standard',
        Firstname: 'first_' + new Date().getTime().toString(),
        Lastname: 'last_' + new Date().getTime().toString()
    }
    it('should get All users on GET /api/users', function (done) {
        chai.request(server)
            .get('/api/users')
            .end(function(error, result){
                expect(result, 'server responds 200').to.have.status(200);
                done();
            });
    });
    it('should create ONE user on POST /signup', function (done) {
        chai.request(server)
            .post('/signup')
            .send(newUser)
            .end(function (error, result) {
                expect(result, 'server responds 200').to.have.status(200);
                expect(result, 'response is JSON').to.be.json;
                expect(result.body, 'respond body has ID').to.have.property('insertId');
                newUser.Uid = result.body.insertId;
                done();                
            });
    });
    it('should get ONE just created user on GET /api/users/:Uid', function (done) {
        chai.request(server)
            .get('/api/users/' + newUser.Uid)
            .end(function(error, result){
                expect(result, 'server responds 200').to.have.status(200);
                expect(result, 'response is JSON').to.be.json;
                expect(result.body, 'respond body has ID').to.have.property('Uid');
                expect(result.body.Uid, 'respond body has the correct ID').to.be.equal(newUser.Uid);
                expect(result.body, 'respond body has email').to.have.property('Email');
                expect(result.body.Email, 'respond body has correct email').to.be.equal(newUser.Email);
                done();
            });
    });
    it('should update ONE just created user on PUT /api/users/:Uid', function (done) {
        chai.request(server)
            .get('/api/users/' + newUser.Uid)
            .end(function(error, result){
                newUser.Firstname = 'updated_firstname';
                result.body.Firstname = newUser.Firstname;
                chai.request(server)
                    .put('/api/users/' + newUser.Uid)
                    .send(result.body)
                    .end(function (err, res) {
                        expect(res, 'server responds 200').to.have.status(200);
                        expect(res, 'response is JSON').to.be.json;  
                        done();
                    });
            });
    });
    it('should delete ONE created user on DELETE /api/users/:Uid', function (done) {
        chai.request(server)
            .delete('/api/users/' + newUser.Uid)
            .end(function (error, result) {
                expect(result, 'server responds 200').to.have.status(200);    
                console.log(result.body);  
                done();         
            });
    });
});
