import Ember from 'ember';
/* globals Hammer */

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['paper-backdrop', 'md-opaque', 'md-default-theme'],

  // Hammer event handler for tapping backdrop
  tapHammer: null,

  subscribeToTouchEvents: function() {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this._collapseSidenav));
    this.set('tapHammer', hammer);
  }.on('didInsertElement'),

  _collapseSidenav: function(event) {
    Ember.$(event.target).trigger('collapseSidenav');
    return false;
  },

  onWillDestroyElement: function() {
    if (Ember.isPresent(this.get('tapHammer'))) {
      this.get('tapHammer').destroy();
    }
  }.on('willDestroyElement')

});
