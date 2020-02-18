/**
 * @module ember-paper
 */

import Mixin from '@ember/object/mixin';
import { assert, warn } from '@ember/debug';
import { isArray, A } from '@ember/array';
import { get, computed, defineProperty } from '@ember/object';
import { bool, reads, not } from '@ember/object/computed';
import { loc } from '@ember/string';
import { isBlank } from '@ember/utils';
import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';
import { invokeAction } from 'ember-invoke-action';

/**
 * In order to make validation generic it is required that components using the validation mixin
 * specify what property the validation logic should be based on.
 *
 * @public
 *
 * @return computed property that depends on the supplied property name
 */
function buildComputedValidationMessages(property, validations = [], customValidations = []) {
  let validationParams = validations.map((v) => get(v, 'param')).filter((v) => !isBlank(v));
  let customValidationParams = customValidations.map((v) => get(v, 'param')).filter((v) => !isBlank(v));

  return computed(property, 'errors.[]', 'customValidations.[]', ...validationParams, ...customValidationParams, function() {
    let validations = A();
    let messages = A();

    // built-in validations
    validations.pushObjects(this.validations());

    // custom validations
    let customValidations = this.get('customValidations');
    assert('`customValidations` must be an array', isArray(customValidations));
    validations.pushObjects(customValidations);

    // execute validations
    let currentValue = this.get(property);
    validations.forEach((validation) => {
      assert('validation must include a `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');
      try {
        let valParam = get(validation, 'param');
        let paramValue = valParam ? this.get(valParam) : undefined;
        if (!validation.validate(currentValue, paramValue)) {
          let message = this.get(`errorMessages.${valParam}`) || get(validation, 'message');
          messages.pushObject({
            message: loc(message.string || message, paramValue, currentValue)
          });
        }
      } catch(error) {
        warn(`Exception with validation: ${validation} ${error}`, false);
      }
    });

    // error messages array
    let errors = this.get('errors') || [];
    assert('`errors` must be an array', isArray(errors));
    messages.pushObjects(errors.map((e) => {
      return get(e, 'message') ? e : { message: e };
    }));

    return messages;
  });
}

/**
 * @class ValidationMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  validationErrorMessages: null,
  lastIsInvalid: undefined,
  validationProperty: null, // property that validation should be based on

  init() {
    this._super(...arguments);
    assert('validationProperty must be set', this.get('validationProperty'));
    if (!this.get('validationErrorMessages')) {
      let computedValidationMessages = buildComputedValidationMessages(
        this.get('validationProperty'),
        this.validations(),
        this.get('customValidations')
      );
      defineProperty(this, 'validationErrorMessages', computedValidationMessages);
    }
  },

  hasErrorMessages: bool('validationErrorMessages.length'),

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
  isInvalid: reads('hasErrorMessages'),
  isValid: not('isInvalid'),

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

  notifyValidityChange() {
    let isValid = this.get('isValid');
    let lastIsValid = this.get('lastIsValid');
    let isTouched = this.get('isTouched');
    let lastIsTouched = this.get('lastIsTouched');
    if (lastIsValid !== isValid || lastIsTouched !== isTouched) {
      invokeAction(this, 'onValidityChange', isValid);
      this.set('lastIsValid', isValid);
      this.set('lastIsTouched', isTouched);
    }
  },
  customValidations: [],
  errors: []
});
