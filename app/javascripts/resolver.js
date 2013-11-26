define('aurora/resolver', [], function () {
  'use strict';

  function resolveRouter() {
    return require('aurora/router');
  }

  function resolveTemplate(parsedName) {
    return require('aurora/templates/' + parsedName.name);
  }

  return Ember.DefaultResolver.extend({
    resolveRouter: resolveRouter,
    resolveTemplate: resolveTemplate
  });
});
