process.env.NODE_ENV = 'api_development';
/* test module */
var debug = require('debug')('test');
var chai = require('chai');
var server = require('../app')
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var project = require('./projectModel');

describe('Project Model Test', function () {
    var newTask = {
        Pid: null,
        Uid: 1,
        Name: 'test_' + new Date().getFullYear().toString(),
        Progress: 0,
        Status: 'Initial'
    }
    it('should add new task to User 1', function (done) {
        project.createNewProjectByUserId(newTask.Uid, newTask, function (error, result) {
            if (error) {
                done(error);
                return;
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('affectedRows').that.is.equal(1);
            expect(result).to.have.property('insertId');
            newTask.Pid = result.insertId;
            done();
        })
    });
    it('should find the newly added task of User 1', function (done) {
        project.getProjectById(newTask.Uid, newTask.Pid, function (error, result) {
            if (error) {
                done(error);
                return;
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('Name').that.is.equal(newTask.Name);
            expect(result).to.have.property('Progress').that.is.equal(newTask.Progress);
            expect(result).to.have.property('Status').that.is.equal(newTask.Status);
            done();
        })
    });
    
    newTask.Progress = 60;
    it('should update the newly added task of User 1', function (done) {
        project.updateProjectById(newTask.Uid, newTask.Pid, newTask, function (error, result) {
            if (error) {
                done(error);
                return;
            }
            project.getProjectById(newTask.Uid, newTask.Pid, function (error, result) {
                if (error) {
                    done(error);
                    return;
                }
                expect(result).to.be.an('object');
                expect(result).to.have.property('Name').that.is.equal(newTask.Name);
                expect(result).to.have.property('Progress').that.is.equal(newTask.Progress);
                expect(result).to.have.property('Status').that.is.equal(newTask.Status);
                done();
            })
        })
    });
    it('should delete the newly added task of User 1', function (done) {
        project.deleteProjectById(newTask.Uid, newTask.Pid, function (error, result) {
            if (error) {
                done(error);
                return;
            }
            project.getProjectById(newTask.Uid, newTask.Pid, function (error, result) {
                if (error) {
                    done(error);
                    return;
                }
                console.log(newTask.Pid);
                expect(result).to.be.undefined;
                done();
            })
        })
    });
});

describe('Project CRUD Test', function () {
    var newTask = {
        Pid: null,
        Uid: 1,
        Name: 'test_' + new Date().getFullYear().toString(),
        Progress: 0,
        Status: 'Initial'
    }
    it('should find all projects per GET api/projects', function (done) {
        chai.request(server)
            .get('/api/projects')
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array'); 
                done();
            });
    });
    it('should create a new project per POST api/users/:uid/projects', function (done) {
        chai.request(server)
            .post('/api/users/' + newTask.Uid + '/projects')
            .send(newTask)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.be.an('object');
                expect(result.body).to.have.property('insertId');
                newTask.Pid = result.body.insertId;
                done();
            })
    });
    it('should find the created project per GET api/users/:uid/projects/:pid', function (done) {
        chai.request(server)
            .get('/api/users/' + newTask.Uid + '/projects/' + newTask.Pid)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('Uid').that.is.equal(newTask.Uid);
                expect(result.body).to.have.property('Pid').that.is.equal(newTask.Pid);
                expect(result.body).to.have.property('Name').that.is.equal(newTask.Name);
                expect(result.body).to.have.property('Progress').that.is.equal(newTask.Progress);
                expect(result.body).to.have.property('Status').that.is.equal(newTask.Status);
                done();
            })
    });
    it('should update project per PUT api/users/:uid/projects/:pid', function (done) {
        newTask.Progress += 50;
        chai.request(server)
            .put('/api/users/' + newTask.Uid + '/projects/' + newTask.Pid)
            .send(newTask)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                chai.request(server)
                    .get('/api/users/' + newTask.Uid + '/projects/' + newTask.Pid)
                    .end(function (error, result) {
                        if (error) {
                            return done(error);
                        }
                        expect(result).to.have.status(200);
                        expect(result).to.be.json;
                        expect(result.body).to.be.an('object');    
                        expect(result.body).to.have.property('Uid').that.is.equal(newTask.Uid);
                        expect(result.body).to.have.property('Pid').that.is.equal(newTask.Pid);            
                        expect(result.body).to.have.property('Name').that.is.equal(newTask.Name);
                        expect(result.body).to.have.property('Progress').that.is.equal(newTask.Progress);
                        expect(result.body).to.have.property('Status').that.is.equal(newTask.Status);
                        done();
                    })
            })
    });
    it('should delete project per DELETE api/users/:uid/projects/:pid', function (done) {
        chai.request(server)
            .delete('/api/users/' + newTask.Uid + '/projects/' + newTask.Pid)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                chai.request(server)
                    .get('/api/users/' + newTask.Uid + '/projects/' + newTask.Pid)
                    .end(function (error, result) {
                        if (error) {
                            return done(error);
                        }
                        expect(result).to.have.status(200);
                        expect(result).to.be.json;
                        expect(result.body).to.be.empty;
                        done();
                    })
            })
    });
});
