/* eslint-disable ember/no-classic-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';
import layout from '../templates/components/paper-backdrop';
/**
 * @class PaperBackdrop
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend({
  layout,
  tagName: '',

  // addDestroyedElementClone(original, clone) {
  //   if (original.parentNode) {
  //     original.parentNode.appendChild(clone);
  //   }
  // },

  sendClickAction(onClick, e) {
    e.preventDefault();
    if (onClick) { onClick(e); }
  }
});
