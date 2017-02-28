/**
 * @module ember-paper
 */
import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

const { Component, computed, String: { htmlSafe } } = Ember;

/**
 * @class PaperBackdrop
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend(TransitionMixin, {

  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],
  attributeBindings: ['backdropStyle:style'],

  // TransitionMixin:
  transitionName: 'ng',
  shouldTransition: computed.bool('opaque'),

  backdropStyle: computed('fixed', function() {
    return this.get('fixed') ? htmlSafe('position:fixed;') : null;
  }),

  addDestroyedElementClone(original, clone) {
    original.parent().append(clone);
  },

  sendClickAction(e) {
    e.preventDefault();
    this.sendAction('onClick', e);
  },

  click(e) {
    this.sendClickAction(e);
  },

  // needed for iOS
  // iOS doesn't trigger a click event on normal divs
  // unless we use `cursor: pointer` css
  touchEnd(e) {
    this.sendClickAction(e);
  }
});
