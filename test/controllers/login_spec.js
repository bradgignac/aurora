describe('aurora/controllers/login', function () {
  var Session, session, LoginController, controller, promise;

  beforeEach(function () {
    Session = require('aurora/session/session');
    session = Session.create();

    globalSession = session;

    LoginController = require('aurora/controllers/login');
    controller = LoginController.create();
    controller.set('session', session);

    promise = {
      then: function (callback) {
        callback.call();
      }
    };

    spyOn(session, 'authenticate').andReturn(promise);
  });

  it('authenticates with provided credentials', function () {
    spyOn(controller, 'transitionToRoute');

    controller.set('username', 'judge');
    controller.set('password', 'mynameisjudge');
    controller.send('authenticate');

    expect(session.authenticate).toHaveBeenCalledWith('judge', 'mynameisjudge');
  });

  it('redirects to saved transition', function () {
    var transition = {
      retry: jasmine.createSpy()
    };

    controller.set('nextTransition', transition);
    controller.send('authenticate');

    expect(transition.retry).toHaveBeenCalledWith();
  });

  it('redirects to saved transition', function () {
    spyOn(controller, 'transitionToRoute');

    controller.send('authenticate');

    expect(controller.transitionToRoute ).toHaveBeenCalledWith('index');
  });
});
