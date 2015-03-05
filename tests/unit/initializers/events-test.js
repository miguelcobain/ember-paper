import Ember from 'ember';
import { initialize } from '../../../initializers/events';
import { module, test } from 'qunit';

var container, application;

module('EventsInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it registers sidenav events', function(assert) {
  initialize(container, application);

  var customEvents = application.get('customEvents');

  assert.ok(customEvents);
  assert.deepEqual(customEvents, {
    toggleSidenav: 'toggleSidenav',
    expandSidenav: 'expandSidenav',
    collapseSidenav: 'collapseSidenav'
  });

});

test('it doesn\'t override any previously set events', function(assert) {
  application.set('customEvents', {
    aCustomEvent: 'aCustomEvent'
  });

  initialize(container, application);

  var customEvents = application.get('customEvents');

  assert.ok(customEvents);
  assert.deepEqual(customEvents, {
    aCustomEvent: 'aCustomEvent',
    toggleSidenav: 'toggleSidenav',
    expandSidenav: 'expandSidenav',
    collapseSidenav: 'collapseSidenav'
  });

});
