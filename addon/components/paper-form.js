/* eslint-disable ember/no-classic-components, ember/no-mixins, ember/require-tagless-components, ember/no-actions-hash */
/**
 * @module ember-paper
 */
import { not, and } from '@ember/object/computed';

import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/paper-form';
import ParentMixin from 'ember-paper/mixins/parent-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

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

  isValid: not('isInvalid'),
  isInvalid: computed('childComponents.@each.isInvalid', function() {
    return this.childComponents.isAny('isInvalid');
  }),

  isTouched: computed('childComponents.@each.isTouched', function() {
    return this.childComponents.isAny('isTouched');
  }),

  isInvalidAndTouched: and('isInvalid', 'isTouched'),

  submit() {
    this.send('onSubmit');
    return false;
  },

  actions: {
    onValidityChange() {
      if (this.lastIsValid !== this.isValid || this.lastIsTouched !== this.isTouched) {
        invokeAction(this, 'onValidityChange', this.isValid, this.isTouched, this.isInvalidAndTouched);
        this.set('lastIsValid', this.isValid);
        this.set('lastIsTouched', this.isTouched);
      }
    },
    onSubmit() {
      if (this.isInvalid) {
        this.childComponents.setEach('isTouched', true);
        invokeAction(this, 'onInvalid');
      } else {
        invokeAction(this, 'onSubmit');
        this.childComponents.setEach('isTouched', false);
      }
    }
  }
});
