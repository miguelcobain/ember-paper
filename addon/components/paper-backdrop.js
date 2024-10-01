/* eslint-disable ember/no-classic-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';
/**
 * @class PaperBackdrop
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend({
  tagName: '',

  // addDestroyedElementClone(original, clone) {
  //   if (original.parentNode) {
  //     original.parentNode.appendChild(clone);
  //   }
  // },

  sendClickAction(onClick, e) {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  },
});
