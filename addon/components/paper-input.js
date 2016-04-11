import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';

const { $, computed, isPresent, isArray, isEmpty, isBlank, isNone, Logger, A, getWithDefault, run, assert, get } = Ember;

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
  tabindex: -1,
  hideAllMessages: false,
  isTouched: false,

  hasValue: computed.notEmpty('value'),

  inputElementId: computed('elementId', function() {
    return `input-${this.get('elementId')}`;
  }),

  isInvalid: computed('isTouched', 'validationErrorMessages.length', function() {
    return this.get('isTouched') && this.get('validationErrorMessages.length');
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
        if (!isNone(this.get(valParam)) && !validation.validate(currentValue, this.get(valParam))) {
          let message = this.get(`errorMessages.${valParam}`) || get(validation, 'message');
          messages.pushObject({
            message: Ember.String.loc(message, this.get(valParam), currentValue)
          });
        }
      } catch (error) {
        Logger.error('Exception with custom validation: ', validation, error);
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
    assert('{{paper-input}} requires an `onChange` function', this.get('onChange') && typeof this.get('onChange') === 'function');
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('textarea')) {
      $(window).on(`resize.${this.elementId}`, run.bind(this, this.growTextarea));
    }
  },

  didRender() {
    if (this.get('textarea')) {
      this.growTextarea();
    }
  },

  willDestroyElement() {
    if (this.get('textarea')) {
      $(window).off(`resize.${this.elementId}`);
    }
  },

  growTextarea() {
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
  },

  getHeight(inputElement) {
    let { offsetHeight } = inputElement.get(0);
    let line = inputElement.get(0).scrollHeight - offsetHeight;
    return offsetHeight + (line > 0 ? line : 0);
  },

  actions: {
    handleInput(e) {
      this.sendAction('onChange', e.target.value);
      this.growTextarea();
    },

    handleBlur(e) {
      this.sendAction('onBlur', e);
      this.set('isTouched', true);
    }
  }
});
