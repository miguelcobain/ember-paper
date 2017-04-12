/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-checkbox';
import ChildMixin from 'ember-paper/mixins/child-mixin';

const { Component, assert, computed, A } = Ember;

/**
 * @class PaperCheckbox
 * @extends Ember.Component
 * @uses ChildMixin
 */
export default Component.extend(ChildMixin, {
  layout,
  tagName: 'md-input-container',

  value: false,
  isTouched: false,

  notIndeterminate: computed.not('indeterminate'),
  isChecked: computed.and('notIndeterminate', 'value'),
  isNotChecked: computed.not('isChecked'),
  isInvalid: computed.and('required', 'isNotChecked'),
  isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

  displayErrorMessages: computed('errorMessages.required', function() {
    let messages = A();
    messages.pushObject(this.get('errorMessages.required') || 'This is required.');
    return messages;
  }),

  init() {
    this._super(...arguments);
    assert('{{paper-checkbox}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
  },
});
