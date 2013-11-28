describe('aurora/routes/authenticated', function () {
  var Session, session, Route, route;

  beforeEach(function () {
    Session = require('aurora/session/session');
    session = Session.create();

    Route = require('aurora/routes/authenticated');
    route = Route.create();
    route.set('session', session);
  });

  it('redirects to login route when user is not authenticated', function () {
    spyOn(session, 'isAuthenticated').andReturn(false);
    spyOn(route, 'transitionTo');

    route.beforeModel();

    expect(route.transitionTo).toHaveBeenCalledWith('login');
  });

  it('does not redirect to login route when user is authenticated', function () {
    spyOn(session, 'isAuthenticated').andReturn(true);
    spyOn(route, 'transitionTo');

    route.beforeModel();

    expect(route.transitionTo).not.toHaveBeenCalled();
  });
});
