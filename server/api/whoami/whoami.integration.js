'use strict';

var app = require('../..');
import request from 'supertest';

var newWhoami;

describe('Whoami API:', function() {

  describe('GET /api/whoami', function() {
    var whoamis;

    beforeEach(function(done) {
      request(app)
        .get('/api/whoami')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          whoamis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      whoamis.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/whoami', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/whoami')
        .send({
          name: 'New Whoami',
          info: 'This is the brand new whoami!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWhoami = res.body;
          done();
        });
    });

    it('should respond with the newly created whoami', function() {
      newWhoami.name.should.equal('New Whoami');
      newWhoami.info.should.equal('This is the brand new whoami!!!');
    });

  });

  describe('GET /api/whoami/:id', function() {
    var whoami;

    beforeEach(function(done) {
      request(app)
        .get('/api/whoami/' + newWhoami._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          whoami = res.body;
          done();
        });
    });

    afterEach(function() {
      whoami = {};
    });

    it('should respond with the requested whoami', function() {
      whoami.name.should.equal('New Whoami');
      whoami.info.should.equal('This is the brand new whoami!!!');
    });

  });

  describe('PUT /api/whoami/:id', function() {
    var updatedWhoami;

    beforeEach(function(done) {
      request(app)
        .put('/api/whoami/' + newWhoami._id)
        .send({
          name: 'Updated Whoami',
          info: 'This is the updated whoami!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWhoami = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWhoami = {};
    });

    it('should respond with the updated whoami', function() {
      updatedWhoami.name.should.equal('Updated Whoami');
      updatedWhoami.info.should.equal('This is the updated whoami!!!');
    });

  });

  describe('DELETE /api/whoami/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/whoami/' + newWhoami._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when whoami does not exist', function(done) {
      request(app)
        .delete('/api/whoami/' + newWhoami._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
