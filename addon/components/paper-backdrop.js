import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['paper-backdrop', 'md-opaque', 'md-default-theme'],

  subscribeToTouchEvents: function() {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this._collapseSidenav));
  }.on('didInsertElement'),

  _collapseSidenav: function(event) {
    Ember.$(event.target).trigger('collapseSidenav');
    return false;
  }

});
