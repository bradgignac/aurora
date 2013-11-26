define('resolver', [], function () {
  function resolveRouter(parsedName) {
    return require('aurora/router');
  }

  return Ember.DefaultResolver.extend({
    resolveRouter: resolveRouter
  });
});
