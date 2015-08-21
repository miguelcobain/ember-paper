import Ember from 'ember';
/* globals Hammer */

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],

  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],


  // Hammer event handler for tapping backdrop
  tapHammer: null,

  subscribeToTouchEvents: Ember.on('didInsertElement', function() {
    var el = this.$().detach();
    Ember.$('body').prepend(el);

    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this.onTap));
    this.set('tapHammer', hammer);
  }),

  onTap (e) {
    e.preventDefault();

    this.sendAction('tap');
  }



});
