describe('Resolver', function () {
  'use strict';

  var Resolver, resolver;

  beforeEach(function () {
    Resolver = require('aurora/resolver');
    resolver = Resolver.create();
  });

  it('resolves controller', function () {
    var Controller;

    Controller = require('aurora/controllers/login');

    expect(resolver.resolveController({ name: 'login' })).toBe(Controller);
  });

  it('resolves router', function () {
    var Router;

    Router = require('aurora/router');

    expect(resolver.resolveRouter()).toBe(Router);
  });

  it('resolves route', function () {
    var Route;

    Route = require('aurora/routes/index');

    expect(resolver.resolveRoute({ name: 'index' })).toBe(Route);
  });

  it('resolves template', function () {
    var module, template;

    module = jasmine.createSpy('module');
    spyOn(window, 'require').andCallFake(function (name) {
      if (name === 'aurora/templates/my-template-name') {
        return module;
      }
    });

    template = resolver.resolveTemplate({ name: 'my-template-name' });

    expect(template).toBe(module);
  });
});
