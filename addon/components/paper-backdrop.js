import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

/* globals Hammer */

export default Ember.Component.extend(TransitionMixin, {
  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],

  // TransitionMixin:
  transitionClass: 'ng',
  shouldTransition: Ember.computed.bool('opaque'),
  addDestroyedElementClone (parent, index, clone) {
    parent.append(clone);
  },

  // Hammer event handler for tapping backdrop
  tapHammer: null,


  didInsertElement() {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this.onTap));
    this.set('tapHammer', hammer);
  },

  onTap(e) {
    e.preventDefault();
    this.sendAction('tap');
  }

});
