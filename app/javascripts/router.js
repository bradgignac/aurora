define('aurora/router', [], function () {
  'use strict';

  var Router;

  Router = Ember.Router.extend();
  Router.map(function () {
    this.route('login');

    this.route('dashboard');
  });

  return Router;
});
