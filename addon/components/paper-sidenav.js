/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, computed } = Ember;

/**
 * @class PaperSidenav
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: '',

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  open: false,
  closed: computed.not('open'),
  closeOnClick: true,

  actions: {
    onToggle() {
      this.sendAction('onToggle', ...arguments);
    },
    onBackdropTap() {
      this.sendAction('onToggle', false);
    }
  }
});
