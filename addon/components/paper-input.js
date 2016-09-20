/**
 * @module ember-paper
 */
import Ember from 'ember';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';

import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';

const {
  Component, $, computed, isArray, isEmpty, Logger, A, run, assert, get
} = Ember;

/**
 * @class PaperInput
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ChildMixin
 * @uses ColorMixin
 * @uses FlexMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, FlexMixin, ChildMixin, {
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'hasValue:md-input-has-value',
    'isInvalidAndTouched:md-input-invalid',
    'eitherIcon:md-has-icon',
    'iconRight:md-icon-right',
    'focused:md-input-focused',
    'block:md-block'
  ],
  type: 'text',
  autofocus: false,
  tabindex: null,
  hideAllMessages: false,
  isTouched: false,
  lastIsInvalid: undefined,

  hasValue: computed('value', 'isNativeInvalid', function() {
    let value = this.get('value');
    let isNativeInvalid = this.get('isNativeInvalid');
    return !isEmpty(value) || isNativeInvalid;
  }),

  inputElementId: computed('elementId', function() {
    return `input-${this.get('elementId')}`;
  }),

  /**
   * The result of isInvalid is appropriate for controlling the display of
   * validation error messages. It also may be used to distinguish whether
   * the input would be considered valid after it is touched.
   *
   * @public
   *
   * @return {boolean} Whether the input is or would be invalid.
   *    false: input is valid (touched or not), or is no longer rendered
   *    true: input has been touched and is invalid.
   */
  isInvalid: computed.or('validationErrorMessages.length', 'isNativeInvalid'),
  isValid: computed.not('isInvalid'),

  isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

  renderCharCount: computed('value', function() {
    let currentLength = this.get('value') ? this.get('value').length : 0;
    return `${currentLength}/${this.get('maxlength')}`;
  }),

  eitherIcon: computed.or('icon', 'iconRight'),

  /**
   * Return the built-in validations.
   *
   * May be overridden to provide additional built-in validations. Be sure to
   * call this._super() to retrieve the standard validations.
   *
   * @public
   */
  validations() {
    return [
      requiredValidator,
      minValidator,
      maxValidator,
      minlengthValidator,
      maxlengthValidator
    ];
  },

  customValidations: [],
  errors: [],

  /**
   * Computed property that validate the input and return an array of error
   * objects, each with an ng-message code and an error message.
   *
   * @public
   */
  validationErrorMessages: computed('value', 'errors.[]', 'customValidations.[]', function() {
    let validations = A();
    let messages = A();

    // built-in validations
    validations.pushObjects(this.validations());

    // custom validations
    let customValidations = this.get('customValidations');
    assert('`customValidations` must be an array', isArray(customValidations));
    validations.pushObjects(customValidations);

    // execute validations
    let currentValue = this.get('value');
    validations.forEach((validation) => {
      assert('validation must include an `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');
      try {
        let valParam = get(validation, 'param');
        let paramValue = valParam ? this.get(valParam) : undefined;
        if (!validation.validate(currentValue, paramValue)) {
          let message = this.get(`errorMessages.${valParam}`) || get(validation, 'message');
          messages.pushObject({
            message: Ember.String.loc(message.string || message, paramValue, currentValue)
          });
        }
      } catch (error) {
        Logger.error('Exception with validation: ', validation, error);
      }
    });

    // error messages array
    let errors = this.get('errors') || [];
    assert('`errors` must be an array', isArray(errors));
    messages.pushObjects(errors.map((e) => {
      return get(e, 'message') ? e : { message: e };
    }));

    return messages;
  }),

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
    this.growTextarea();
    // setValue below ensures that the input value is the same as this.value
    this.setValue(this.get('value'));
  },

  willClearRender() {
    this.sendAction('onValidityChange', false);
  },

  willDestroyElement() {
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

  notifyValidityChange() {
    let isValid = this.get('isValid');
    let lastIsValid = this.get('lastIsValid');
    if (lastIsValid !== isValid) {
      this.sendAction('onValidityChange', isValid);
      this.set('lastIsValid', isValid);
    }
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
