describe('Session', function () {
  'use strict';

  var Session;

  beforeEach(function () {
    Session = require('aurora/session/session');
  });

  describe('authenticate', function () {
    describe('new session', function () {
      var promise, session, request;

      beforeEach(function () {
        promise = new jQuery.Deferred();
        spyOn(jQuery, 'ajax').andReturn(promise);

        session = Session.create();
        request = session.authenticate('username', 'password');
      });

      it('makes request for new token', function () {
        expect(jQuery.ajax).toHaveBeenCalledWith({
          type: 'POST',
          contentType: 'application/json',
          url: 'https://identity.api.rackspacecloud.com/v2.0/tokens',
          data: JSON.stringify({
            auth: {
              passwordCredentials: {
                username: 'username',
                password: 'password'
              }
            }
          })
        });
      });

      it('persists session to session storage', function () {
        spyOn(sessionStorage, 'setItem');

        promise.resolve('this is my data');

        expect(sessionStorage.setItem).toHaveBeenCalledWith('aurora-session', 'this is my data');
      });

      it('sets authenticated to true', function () {
        promise.resolve('this is my data');

        expect(session.isAuthenticated()).toBeTruthy();
      });
    });

    describe('existing session', function () {
      var session;

      beforeEach(function () {
        spyOn(sessionStorage, 'getItem').andCallFake(function (key) {
          if (key === 'aurora-session') {
            return 'this is my session';
          }
        });

        session = Session.create();
      });

      it('is authenticated before making a request', function () {
        expect(session.isAuthenticated()).toBeTruthy();
      });

      it('does not make request for new token', function () {
        spyOn(jQuery, 'ajax');

        session.authenticate('username', 'password');

        expect(jQuery.ajax).not.toHaveBeenCalled();
      });
    });
  });
});
