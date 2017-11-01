/**
 * @module ember-paper
 */
import { not } from '@ember/object/computed';

import Component from '@ember/component';
import layout from '../templates/components/paper-sidenav';

/**
 * @class
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  open: false,
  closed: not('open'),
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
