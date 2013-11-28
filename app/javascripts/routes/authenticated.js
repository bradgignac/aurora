define('aurora/routes/authenticated', [], function () {
  return Ember.Route.extend({
    beforeModel: function () {
      if (this.session.isAuthenticated()) {
        return;
      }

      this.transitionTo('login');
    }
  });
});
