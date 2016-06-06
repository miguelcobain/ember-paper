import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
const { Component, computed, String: { htmlSafe } } = Ember;

export default Component.extend(TransitionMixin, {

  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],
  attributeBindings: ['backdropStyle:style'],

  // TransitionMixin:
  transitionClass: 'ng',
  shouldTransition: computed.bool('opaque'),

  backdropStyle: computed('fixed', 'translateStyle', function() {
    let style = this.get('translateStyle');
    return this.get('fixed') ? htmlSafe(`position:fixed; ${style}`) : style;
  }),

  addDestroyedElementClone(parent, index, clone) {
    parent.append(clone);
  },

  click(e) {
    e.preventDefault();
    this.sendAction('onClick', e);
  }

});
