import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';

const { $, computed, isArray, isEmpty, Logger, A, run, assert, get } = Ember;

export default BaseFocusable.extend(ColorMixin, FlexMixin, {
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'hasValue:md-input-has-value',
    'isInvalid:md-input-invalid',
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
   * @return {boolean|null} Whether the input is or would be invalid.
   *    null: input has not yet been touched, but would be invalid if it were
   *    false: input is valid (touched or not), or is no longer rendered
   *    true: input has been touched and is invalid.
   */
  isInvalid: computed('isTouched', 'validationErrorMessages.length', 'isNativeInvalid', function() {
    let isInvalid = this.get('validationErrorMessages.length') || this.get('isNativeInvalid');
    return isInvalid && !this.get('isTouched') ? null : !!isInvalid;
  }),

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
            message: Ember.String.loc(message, paramValue, currentValue)
          });
        }
      } catch (error) {
        Logger.error('Exception with validation: ', validation, error);
      }
    });

    // error messages array
    let errors = this.get('errors');
    assert('`errors` must be an array', isArray(errors));
    messages.pushObjects(errors.map((e) => {
      return get(e, 'message') ? e : { message: e };
    }));

    return messages;
  }),

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    assert('{{paper-input}} and {{paper-select}} require an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    this.notifyInvalid();
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('textarea')) {
      $(window).on(`resize.${this.elementId}`, run.bind(this, this.growTextarea));
    }
  },

  didRender() {
    this.growTextarea();
  },

  willClearRender() {
    this.sendAction('onInvalid', false);
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

      if (minRows) {
        if (!this.lineHeight) {
          inputElement.get(0).style.minHeight = 0;
          this.lineHeight = inputElement.get(0).clientHeight;
          inputElement.get(0).style.minHeight = null;
        }

        let newRows = Math.round(Math.round(this.getHeight(inputElement) / this.lineHeight));
        let rowsToSet = Math.min(newRows, minRows);

        inputElement
          .css('height', `${this.lineHeight * rowsToSet}px`)
          .attr('rows', rowsToSet)
          .toggleClass('md-textarea-scrollable', newRows >= minRows);
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

  notifyInvalid() {
    let isInvalid = this.get('isInvalid');
    if (this.get('lastIsInvalid') !== isInvalid) {
      this.sendAction('onInvalid', this.get('isInvalid'));
      this.set('lastIsInvalid', this.get('isInvalid'));
    }
  },

  actions: {
    handleInput(e) {
      this.sendAction('onChange', e.target.value);
      this.growTextarea();
      let inputElement = this.$('input').get(0);
      this.set('isNativeInvalid', inputElement && inputElement.validity && inputElement.validity.badInput);
      this.notifyInvalid();
    },

    handleBlur(e) {
      this.sendAction('onBlur', e);
      this.set('isTouched', true);
      this.notifyInvalid();
    }
  }
});
