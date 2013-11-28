define('aurora/resolver', [], function () {
  'use strict';

  function resolveRouter() {
    return require('aurora/router');
  }

  function resolveRoute(parsedName) {
    try {
      return require('aurora/routes/' + parsedName.name);
    } catch (e) {
      return null;
    }
  }

  function resolveTemplate(parsedName) {
    return require('aurora/templates/' + parsedName.name);
  }

  return Ember.DefaultResolver.extend({
    resolveRouter: resolveRouter,
    resolveRoute: resolveRoute,
    resolveTemplate: resolveTemplate
  });
});
