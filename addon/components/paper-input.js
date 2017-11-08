/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-input';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import ValidationMixin from 'ember-paper/mixins/validation-mixin';

const { Component, $, computed, isEmpty, run, assert } = Ember;

/**
 * @class PaperInput
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ChildMixin
 * @uses ColorMixin
 * @uses ValidationMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, ChildMixin, ValidationMixin, {
  layout,
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'hasValue:md-input-has-value',
    'isInvalidAndTouched:md-input-invalid',
    'hasLeftIcon:md-icon-left',
    'hasRightIcon:md-icon-right',
    'focused:md-input-focused',
    'block:md-block'
  ],
  type: 'text',
  autofocus: false,
  tabindex: null,
  hideAllMessages: false,
  isTouched: false,

  iconComponent: 'paper-icon',

  // override validation mixin `isInvalid` to account for the native input validity
  isInvalid: computed.or('hasErrorMessages', 'isNativeInvalid'),

  hasValue: computed('value', 'isNativeInvalid', function() {
    let value = this.get('value');
    let isNativeInvalid = this.get('isNativeInvalid');
    return !isEmpty(value) || isNativeInvalid;
  }),

  inputElementId: computed('elementId', function() {
    return `input-${this.get('elementId')}`;
  }),

  renderCharCount: computed('value', function() {
    let currentLength = this.get('value') ? this.get('value').length : 0;
    return `${currentLength}/${this.get('maxlength')}`;
  }),

  hasLeftIcon: computed.bool('icon'),
  hasRightIcon: computed.bool('iconRight'),
  isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

  validationProperty: 'value', // property that validations should be run on

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    assert('{{paper-input}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    this.notifyValidityChange();
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('textarea')) {
      $(window).on(`resize.${this.elementId}`, run.bind(this, this.growTextarea));
    }
  },

  didRender() {
    this._super(...arguments);
    // setValue below ensures that the input value is the same as this.value
    this.setValue(this.get('value'));
    this.growTextarea();
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('textarea')) {
      $(window).off(`resize.${this.elementId}`);
    }
  },

  growTextarea() {
    if (this.get('textarea')) {
      let inputElement = this.$('input, textarea');
      inputElement.addClass('md-no-flex').attr('rows', 1);

      let minRows = this.get('passThru.rows');
      let height = this.getHeight(inputElement);
      if (minRows) {
        if (!this.lineHeight) {
          inputElement.get(0).style.minHeight = 0;
          this.lineHeight = inputElement.get(0).clientHeight;
          inputElement.get(0).style.minHeight = null;
        }
        if (this.lineHeight) {
          height = Math.max(height, this.lineHeight * minRows);
        }
        let proposedHeight = Math.round(height / this.lineHeight);
        let maxRows = this.get('passThru.maxRows') || Number.MAX_VALUE;
        let rowsToSet = Math.min(proposedHeight, maxRows);
        inputElement
          .css('height', `${this.lineHeight * rowsToSet}px`)
          .attr('rows', rowsToSet)
          .toggleClass('md-textarea-scrollable', proposedHeight >= maxRows);
      } else {
        inputElement.css('height', 'auto');
        inputElement.get(0).scrollTop = 0;
        let height = this.getHeight(inputElement);
        if (height) {
          inputElement.css('height', `${height}px`);
        }
      }

      inputElement.removeClass('md-no-flex');
    }
  },

  getHeight(inputElement) {
    let { offsetHeight } = inputElement.get(0);
    let line = inputElement.get(0).scrollHeight - offsetHeight;
    return offsetHeight + (line > 0 ? line : 0);
  },

  setValue(value) {
    if (this.$('input, textarea').val() !== value) {
      this.$('input, textarea').val(value);
    }
  },

  actions: {
    handleInput(e) {
      this.sendAction('onChange', e.target.value);
      // setValue below ensures that the input value is the same as this.value
      run.next(() => {
        if (this.isDestroyed) {
          return;
        }
        this.setValue(this.get('value'));
      });
      this.growTextarea();
      let inputElement = this.$('input').get(0);
      this.set('isNativeInvalid', inputElement && inputElement.validity && inputElement.validity.badInput);
      this.notifyValidityChange();
    },

    handleBlur(e) {
      this.sendAction('onBlur', e);
      this.set('isTouched', true);
      this.notifyValidityChange();
    }
  }
});
