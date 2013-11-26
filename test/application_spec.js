describe('Application', function () {
  'use strict';

  it('uses the custom resolver', function () {
    var Resolver, Application, application;

    Resolver = require('aurora/resolver');
    Application = require('aurora/application');
    application = Application.create();

    expect(application.Resolver).toBe(Resolver);
  });
});
