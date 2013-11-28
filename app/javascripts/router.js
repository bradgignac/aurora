define('aurora/router', [], function () {
  'use strict';

  var Router;

  Router = Ember.Router.extend();
  Router.map(function () {
    this.route('dashboard');
  });

  return Router;
});
