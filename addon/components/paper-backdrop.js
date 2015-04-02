import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';
/* globals Hammer */

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['paper-backdrop', 'md-opaque', 'md-default-theme'],

  navContainer: Ember.computed(function() {
    return this.nearestOfType(PaperNavContainer);
  }),

  // Hammer event handler for tapping backdrop
  tapHammer: null,

  subscribeToTouchEvents: Ember.on('didInsertElement', function() {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this._collapseSidenav));
    this.set('tapHammer', hammer);
  }),

  _collapseSidenav: function() {
    this.get('navContainer').collapseSidenav();
    return false;
  },

  onWillDestroyElement: Ember.on('willDestroyElement', function() {
    if (Ember.isPresent(this.get('tapHammer'))) {
      this.get('tapHammer').destroy();
    }
  })

});
