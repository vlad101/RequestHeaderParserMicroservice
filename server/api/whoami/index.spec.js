'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var whoamiCtrlStub = {
  index: 'whoamiCtrl.index',
  show: 'whoamiCtrl.show',
  create: 'whoamiCtrl.create',
  update: 'whoamiCtrl.update',
  destroy: 'whoamiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var whoamiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './whoami.controller': whoamiCtrlStub
});

describe('Whoami API Router:', function() {

  it('should return an express router instance', function() {
    whoamiIndex.should.equal(routerStub);
  });

  describe('GET /api/whoami', function() {

    it('should route to whoami.controller.index', function() {
      routerStub.get
        .withArgs('/', 'whoamiCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/whoami/:id', function() {

    it('should route to whoami.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'whoamiCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/whoami', function() {

    it('should route to whoami.controller.create', function() {
      routerStub.post
        .withArgs('/', 'whoamiCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/whoami/:id', function() {

    it('should route to whoami.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'whoamiCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/whoami/:id', function() {

    it('should route to whoami.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'whoamiCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/whoami/:id', function() {

    it('should route to whoami.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'whoamiCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
