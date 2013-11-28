define('aurora/session/session', [], function () {
  'use strict';

  return Ember.Object.extend({
    authenticated: false,

    init: function () {
      if (sessionStorage.getItem('aurora-session')) {
        this.authenticated = true;
      }
    },
    authenticate: function (username, password) {
      if (this.authenticated) {
        return;
      }

      return jQuery.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://identity.api.rackspacecloud.com/v2.0/tokens',
        data: this.payloadForCredentials(username, password)
      }).then(jQuery.proxy(this.onSuccess, this));
    },
    payloadForCredentials: function (username, password) {
      return JSON.stringify({
        auth: {
          passwordCredentials: {
            username: username,
            password: password
          }
        }
      });
    },
    onSuccess: function (response) {
      this.authenticated = true;
      sessionStorage.setItem('aurora-session', response);
    },
    isAuthenticated: function () {
      return this.authenticated;
    }
  });
});
