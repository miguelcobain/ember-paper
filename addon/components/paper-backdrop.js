import Ember from 'ember';
import AnimateMixin from 'ember-paper/mixins/animate-mixin';
/* globals Hammer */

export default Ember.Component.extend(AnimateMixin, {
  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],

  animated: Ember.computed.bool('opaque'),

  // Hammer event handler for tapping backdrop
  tapHammer: null,


  didInsertElement () {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this.onTap));
    this.set('tapHammer', hammer);
  },

  onTap (e) {
    e.preventDefault();
    this.sendAction('tap');
  }

});
