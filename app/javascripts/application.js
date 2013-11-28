define('aurora/application', ['aurora/initializers/session', 'aurora/resolver'], function (SessionInitializer, Resolver) {
  'use strict';

  Ember.Application.initializer(SessionInitializer);

  return Ember.Application.extend({
    LOG_ACTIVE_GENERATION: true,
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS: true,
    Resolver: Resolver
  });
});

