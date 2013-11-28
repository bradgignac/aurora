define('aurora/initializers/session', ['aurora/session/session'], function (Session) {
  return {
    name: 'session',
    initialize: function (container, application) {
      application.register('session:session', Session);
      application.inject('controller', 'session', 'session:session');
      application.inject('route', 'session', 'session:session');
    }
  };
});
