/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import layout from '../templates/components/paper-radio-base';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperRadio
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, {
  layout,
  tagName: 'md-radio-button',
  classNames: ['md-default-theme'],
  classNameBindings: ['checked:md-checked'],
  attributeBindings: [
    'role',
    'ariaChecked:aria-checked',
    'ariaLabel:aria-label'
  ],

  tabindex: null,

  toggle: false,
  role: 'radio',

  /* FocusableMixin Overrides */
  focusOnlyOnKey: true,

  // Lifecycle hooks
  init() {
    assert('{{paper-radio}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    this._super(...arguments);
  },

  checked: computed('groupValue', 'value', function() {
    return this.get('groupValue') === this.get('value');
  }),

  ariaChecked: computed('checked', function() {
    return this.get('checked') ? 'true' : 'false';
  }),

  labelId: computed('elementId', function() {
    return `${this.elementId}-label`;
  }),

  click() {
    if (!this.get('disabled')) {
      if (this.get('toggle')) {
        invokeAction(this, 'onChange', this.get('checked') ? null : this.get('value'));
      } else {
        invokeAction(this, 'onChange', this.get('value'));
      }
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
});
