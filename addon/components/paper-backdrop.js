/**
 * @module ember-paper
 */
import { bool } from '@ember/object/computed';

import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import { invokeAction } from 'ember-invoke-action';
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
  shouldTransition: bool('opaque'),

  backdropStyle: computed('fixed', function() {
    return this.get('fixed') ? htmlSafe('position:fixed;') : null;
  }),

  addDestroyedElementClone(original, clone) {
    if (original.parentNode) {
      original.parentNode.appendChild(clone);
    }
  },

  sendClickAction(e) {
    e.preventDefault();
    invokeAction(this, 'onClick', e);
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
