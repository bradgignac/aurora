describe('aurora/initializers/session', function () {
  var Session, initializer, application;

  beforeEach(function () {
    Session = require('aurora/session/session');
    initializer = require('aurora/initializers/session');
    application = {
      register: jasmine.createSpy('register'),
      inject: jasmine.createSpy('inject')
    };
  });

  it('registers session with container', function () {
    initializer.initialize(undefined, application);

    expect(application.register).toHaveBeenCalledWith('session:session', Session);
  });

  it('injects session into controller', function () {
    initializer.initialize(undefined, application);

    expect(application.inject).toHaveBeenCalledWith('controller', 'session', 'session:session');
  });

  it('injects session into route', function () {
    initializer.initialize(undefined, application);

    expect(application.inject).toHaveBeenCalledWith('route', 'session', 'session:session');
  });
});
