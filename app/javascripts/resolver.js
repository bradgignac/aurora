define('aurora/resolver', [], function () {
  'use strict';

  function resolveRouter() {
    return require('aurora/router');
  }

  return Ember.DefaultResolver.extend({
    resolveRouter: resolveRouter
  });
});
