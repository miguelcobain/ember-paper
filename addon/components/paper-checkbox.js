/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-checkbox';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';

const { Component, inject, assert, computed } = Ember;

/**
 * @class PaperCheckbox
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses RippleMixin
 * @uses ColorMixin
 * @uses ProxiableMixin
 */
export default Component.extend(FocusableMixin, RippleMixin, ColorMixin, ProxiableMixin, {
  layout,
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['isChecked:md-checked', 'indeterminate:md-indeterminate'],

  /* RippleMixin Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  /* FocusableMixin Overrides */
  focusOnlyOnKey: true,

  constants: inject.service(),

  value: false,

  notIndeterminate: computed.not('indeterminate'),
  isChecked: computed.and('notIndeterminate', 'value'),

  init() {
    this._super(...arguments);
    assert('{{paper-checkbox}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
  },

  click() {
    if (!this.get('disabled')) {
      this.sendAction('onChange', !this.get('value'));
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
      ev.preventDefault();
      this.click();
    }
  },

  processProxy() {
    this.sendAction('onChange', !this.get('value'));
  }
});
