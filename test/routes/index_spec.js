describe('aurora/routes/index', function () {
  var Route, route;

  beforeEach(function () {
    Route = require('aurora/routes/index');
    route = Route.create();
  });

  it('redirects to dashboard', function () {
    spyOn(route, 'transitionTo');

    route.beforeModel();

    expect(route.transitionTo).toHaveBeenCalledWith('dashboard');
  });
});
