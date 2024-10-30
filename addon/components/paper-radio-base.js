/* eslint-disable ember/no-classic-components, ember/no-mixins, ember/require-tagless-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class PaperRadio
 * @extends Ember.Component
 * @uses FocusableMixin
 */
export default Component.extend(FocusableMixin, {
  tagName: 'md-radio-button',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'checked:md-checked',
    'warn:md-warn',
    'accent:md-accent',
    'primary:md-primary',
  ],

  attributeBindings: [
    'role',
    'ariaChecked:aria-checked',
    'ariaLabel:aria-label',
  ],

  tabindex: null,
  toggle: false,
  role: 'radio',

  /* FocusableMixin Overrides */
  focusOnlyOnKey: true,

  // Lifecycle hooks
  init() {
    assert(
      '{{paper-radio}} requires an `onChange` action or null for no action.',
      this.onChange !== undefined
    );
    this._super(...arguments);
  },

  checked: computed('groupValue', 'value', function () {
    return this.groupValue === this.value;
  }),

  ariaChecked: computed('checked', function () {
    return this.checked ? 'true' : 'false';
  }),

  labelId: computed('elementId', function () {
    return `${this.elementId}-label`;
  }),

  click() {
    if (!this.disabled) {
      if (this.toggle) {
        invokeAction(this, 'onChange', this.checked ? null : this.value);
      } else {
        invokeAction(this, 'onChange', this.value);
      }
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.bubbles;
  },
});
