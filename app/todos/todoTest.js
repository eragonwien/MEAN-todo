process.env.NODE_ENV = 'api_development';
/* test module */
var debug = require('debug')('test');
var chai = require('chai');
var server = require('../app')
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var todo = require('./todoModel');

describe('Todo Model Test', function () {
    var today = new Date();
    var newTodo = {
        Tid: null,
        Pid: 1,
        Text: 'created on ' + today.getDay + '.' + today.getMonth + '.' + today.getFullYear + ' at ' + today.getHours + '.' + today.getMinutes,
        Status: 'Incomplete'
    }
    it('should add new todo to project 1 of user 1', function (done) {
        todo.createNewTodo(newTodo, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.have.property('insertId');
            newTodo.Tid = result.insertId;
            done();
        })
    });
    it('should find the newly added todo of User 1', function (done) {
        todo.getTodoById(newTodo.Tid, function (error, result) {
            if (error) {
                return done(error);
            }
            expect(result).to.be.an('object');
            expect(result).to.have.property('Tid').which.is.equal(newTodo.Tid);
            expect(result).to.have.property('Pid').which.is.equal(newTodo.Pid);
            expect(result).to.have.property('Text').which.is.equal(newTodo.Text);
            expect(result).to.have.property('Status').which.is.equal(newTodo.Status);
            done();
        })
    });    
    newTodo.Status = 'Complete';
    it('should update the newly added todo of User 1', function (done) {
        todo.updateTodoByTid(newTodo.Tid, newTodo, function (error, result) {
            if (error) {
                return done(error);
            }
            todo.getTodoById(newTodo.Tid, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.an('object');
                expect(result).to.have.property('Tid').which.is.equal(newTodo.Tid);
                expect(result).to.have.property('Pid').which.is.equal(newTodo.Pid);
                expect(result).to.have.property('Text').which.is.equal(newTodo.Text);
                expect(result).to.have.property('Status').which.is.equal(newTodo.Status);
                done();
            })
        })
    });
    it('should delete the newly added todo of User 1', function (done) {
        todo.deleteTodoById(newTodo.Tid, function (error, result) {
            if (error) {
                return done(error);
            }
            todo.getTodoById(newTodo.Tid, function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.be.undefined;
                done();
            })
        })
    });
});

describe('Todo CRUD Test', function () {
    var today = new Date();
    var newTodo = {
        Uid: 1,
        Tid: null,
        Pid: 1,
        Text: 'created on ' + today.getDay() + '.' + today.getMonth() + '.' + today.getFullYear() + ' at ' + today.getHours() + '.' + today.getMinutes(),
        Status: 'Incomplete'
    }
    it('should find all projects per GET api/todos', function (done) {
        chai.request(server)
            .get('/api/todos')
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result.body).to.be.an('array');
                done();
            })
    });
    it('should create a new todo per POST api/users/:uid/projects/:pid/todos', function (done) {
        chai.request(server)
            .post('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos')
            .send(newTodo)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('insertId');
                newTodo.Tid = result.body.insertId;
                done();
            })
    });
    it('should find the created todo per GET api/users/:uid/projects/:pid/todos/:tid', function (done) {
        chai.request(server)
            .get('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos/' + newTodo.Tid)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                expect(result.body).to.have.property('Tid').which.is.equal(newTodo.Tid);
                expect(result.body).to.have.property('Pid').which.is.equal(newTodo.Pid);
                expect(result.body).to.have.property('Text').which.is.equal(newTodo.Text);
                expect(result.body).to.have.property('Status').which.is.equal(newTodo.Status);
                done();
            })
    });
    it('should update project per PUT api/users/:uid/projects/:pid', function (done) {
        newTodo.Status = 'Complete';
        chai.request(server)
            .put('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos/' + newTodo.Tid)
            .send(newTodo)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                expect(result).to.be.json;
                chai.request(server)
                    .get('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos/' + newTodo.Tid)
                    .end(function (error, result) {
                        if (error) {
                            return done(error);
                        }
                        expect(result).to.have.status(200);
                        expect(result).to.be.json;
                        expect(result.body).to.have.property('Tid').which.is.equal(newTodo.Tid);
                        expect(result.body).to.have.property('Pid').which.is.equal(newTodo.Pid);
                        expect(result.body).to.have.property('Text').which.is.equal(newTodo.Text);
                        expect(result.body).to.have.property('Status').which.is.equal(newTodo.Status);
                        done();
                    })
            })
    });
    it('should delete project per DELETE api/users/:uid/projects/:pid', function (done) {
        chai.request(server)
            .delete('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos/' + newTodo.Tid)
            .end(function (error, result) {
                if (error) {
                    return done(error);
                }
                expect(result).to.have.status(200);
                chai.request(server)
                    .get('/api/users/' + newTodo.Uid + '/projects/' + newTodo.Pid + '/todos/' + newTodo.Tid)
                    .end(function (error, result) {
                        if (error) {
                            return done(error);
                        }
                        expect(result).to.have.status(200);
                        expect(result.body).to.be.empty;
                        done();
                    })
            })
    });
});
