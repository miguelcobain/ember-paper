/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-form';
import ParentMixin from 'ember-paper/mixins/parent-mixin';

const { Component, computed } = Ember;

/**
 * @class PaperForm
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'form',

  inputComponent: 'paper-input',
  submitButtonComponent: 'paper-button',
  selectComponent: 'paper-select',
  autocompleteComponent: 'paper-autocomplete',

  isValid: computed.not('isInvalid'),
  isInvalid: computed('childComponents.@each.isInvalid', function() {
    return this.get('childComponents').isAny('isInvalid');
  }),

  isTouched: computed('childComponents.@each.isTouched', function() {
    return this.get('childComponents').isAny('isTouched');
  }),

  isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

  submit() {
    this.send('onSubmit');
    return false;
  },

  actions: {
    onValidityChange() {
      if (this.get('lastIsValid') !== this.get('isValid') || this.get('lastIsTouched') !== this.get('isTouched')) {
        this.sendAction('onValidityChange', this.get('isValid'), this.get('isTouched'), this.get('isInvalidAndTouched'));
        this.set('lastIsValid', this.get('isValid'));
        this.set('lastIsTouched', this.get('isTouched'));
      }
    },
    onSubmit() {
      if (this.get('isInvalid')) {
        this.get('childComponents').setEach('isTouched', true);
      } else {
        this.sendAction('onSubmit');
        this.get('childComponents').setEach('isTouched', false);
      }
    }
  }
});
