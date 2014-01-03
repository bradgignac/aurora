define('aurora/controllers/login', function () {
  return Ember.Controller.extend({
    actions: {
      authenticate: function () {
        var self, username, password;

        self = this;
        username = this.get('username');
        password = this.get('password');

        this.get('session').authenticate(username, password).then(function () {
          var transition = self.get('nextTransition');

          if (transition) {
            transition.retry();
          } else {
            self.transitionToRoute('index');
          }
        });
      }
    }
  });
});
