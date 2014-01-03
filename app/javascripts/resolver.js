define('aurora/resolver', [], function () {
  'use strict';

  function resolveController(parsedName) {
    try {
      return require('aurora/controllers/' + parsedName.name);
    } catch (e) {
      return null;
    }
  }

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
    resolveController: resolveController,
    resolveRouter: resolveRouter,
    resolveRoute: resolveRoute,
    resolveTemplate: resolveTemplate
  });
});
