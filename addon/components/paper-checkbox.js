/* eslint-disable ember/no-classic-components, ember/no-mixins, ember/require-tagless-components, ember/no-get */
/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { computed } from '@ember/object';
import { not, and } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import layout from '../templates/components/paper-checkbox';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';
/**
 * @class PaperCheckbox
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 * @uses ProxiableMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, ProxiableMixin, {
  layout,
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['isChecked:md-checked', 'indeterminate:md-indeterminate'],
  attributeBindings: [
    'role:role',
    'ariaLabel:aria-label',
    'ariaChecked:aria-checked',
    'labelId:aria-labelledby'
  ],

  /* FocusableMixin Overrides */
  focusOnlyOnKey: true,

  constants: service(),

  value: false,
  role: 'checkbox',

  notIndeterminate: not('indeterminate'),
  isChecked: and('notIndeterminate', 'value'),
  ariaChecked: computed('isChecked', 'indeterminate', function() {
    if (this.indeterminate) {
      return 'mixed';
    }

    return this.isChecked ? 'true' : 'false';
  }),
  labelId: computed('elementId', function() {
    return `${this.elementId}-label`;
  }),

  init() {
    this._super(...arguments);
    assert('{{paper-checkbox}} requires an `onChange` action or null for no action.', this.onChange !== undefined);
  },

  click() {
    if (!this.disabled) {
      invokeAction(this, 'onChange', !this.value);
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.bubbles;
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
      ev.preventDefault();
      this.click();
    }
  },

  processProxy() {
    invokeAction(this, 'onChange', !this.value);
  }
});
