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
  // The below 2 properties exists so that paper-form can properly reset the isTouched property. Passing in isTouched with a read only helper
  // doesn't work because when the component rerenders, it reinherits (wrongfully) the isTouched value of the parent on each rerender.
  _isTouched: false,
  touchedTrigger: 0,
  previousTriggerValue: 0,
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
            message: Ember.String.loc(message, paramValue, currentValue)
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
    assert('{{paper-input}} and {{paper-select}} require an `onChange` action or null for no action.', this.get('onChange') !== undefined);
    this.notifyInvalid();
  },

  didUpdateAttrs(params) {
    // This exists so that a form can properly reset the isTouched value upon successful submittal. Simply passing in a readonly version of the
    // property does not work due to the fact that this component reinherits the isTouched value of the parent on every rerender. So here,
    // we check to see that the facade property has actually changed before updating the real property. We have to use the increment properties
    // to trigger the set in the case of the form resetting isTouched to false -- the parent value will have not changed, but we need to trigger
    // isTouched to reset to false regardless
    if (params.oldAttrs._isTouched !== params.newAttrs._isTouched || (this.get('touchedTrigger') > this.get('previousTriggerValue'))) {
      this.set('previousTriggerValue', this.get('touchedTrigger'));
      this.set('isTouched', this.get('_isTouched'));
    }
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
    let lastIsInvalid = this.get('lastIsInvalid');
    if (lastIsInvalid !== isInvalid) {
      this.sendAction('onInvalid', isInvalid);
      this.set('lastIsInvalid', isInvalid);
    }
  },

  setValue(value) {
    this.$('input, textarea').val(value);
  },

  actions: {
    handleInput(e) {
      this.sendAction('onChange', e.target.value);
      // setValue below ensures that the input value is the same as this.value
      this.setValue(this.get('value'));
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
