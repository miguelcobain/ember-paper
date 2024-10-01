/* eslint-disable ember/no-actions-hash, ember/no-classic-components */
/**
 * @module ember-paper
 */
import { not } from '@ember/object/computed';

import Component from '@ember/component';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: '',
  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  open: false,
  closed: not('open'),
  closeOnClick: true,

  actions: {
    onToggle() {
      invokeAction(this, 'onToggle', ...arguments);
    },
    onBackdropTap() {
      invokeAction(this, 'onToggle', false);
    },
  },
});
