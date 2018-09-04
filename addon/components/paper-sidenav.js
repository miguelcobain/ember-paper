/**
 * @module ember-paper
 */
import { not } from '@ember/object/computed';

import Component from '@ember/component';
import layout from '../templates/components/paper-sidenav';
import { invokeAction } from 'ember-invoke-action';

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
      invokeAction(this, 'onToggle', ...arguments);
    },
    onBackdropTap() {
      invokeAction(this, 'onToggle', false);
    }
  }
});
