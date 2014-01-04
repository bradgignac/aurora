define('aurora/routes/index', [], function () {
  return Ember.Route.extend({
    beforeModel: function () {
      this.transitionTo('dashboard');
    }
  });
});
