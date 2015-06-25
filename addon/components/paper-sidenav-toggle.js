import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-sidenav-toggle',
  classNames: ['paper-sidenav-toggle'],
  toggle: true,

  paperEventBus: Ember.inject.service('paper-eventbus'),

  click() {
    if (this.get('toggle')) {
      this.get("paperEventBus").publish('paper:toggle-sidenav');
    } else {
      this.get("paperEventBus").publish('paper:expand-sidenav');
    }
    return false;
  }
});
