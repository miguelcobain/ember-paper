import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-sidenav-toggle',
  classNames: ['paper-sidenav-toggle'],
  toggle: true,

  click: function(evt) {
    var eventName;
    if (this.get('toggle')) {
      eventName = 'toggleSidenav';
    } else {
      eventName = 'expandSidenav';
    }
    Ember.$(evt.target).trigger(eventName);
    return false;
  }
});
