import { assert, warn } from '@ember/debug';
import { isArray } from '@ember/array';
import { get, set } from '@ember/object';
import { loc } from '@ember/string';
import { invokeAction } from 'ember-invoke-action';

/**
 * In order to make validation generic it is required that components using the validation mixin
 * specify what property the validation logic should be based on.
 *
 * @public
 *
 * @return computed property that depends on the supplied property name
 */
export function buildComputedValidationMessages(property) {
  const validators = [];
  const messages = [];

  // built-in validations
  validators.push(...get(this, 'validations'));

  // custom validations
  let customValidators = get(this, 'customValidations');

  assert('`customValidations` must be an array', isArray(customValidators));

  validators.push(...customValidators);

  // execute validations
  let currentValue = get(this, property);

  validators.forEach((validation) => {
    assert('validation must include a `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');

    try {
      let valParam = get(validation, 'param');
      let paramValue = valParam ? get(this, valParam) : undefined;

      if (!validation.validate(currentValue, paramValue)) {
        const message = get(this, `errorMessages.${valParam}`) || get(validation, 'message');

        messages.push({
          message: loc(message.string || message, paramValue, currentValue)
        });
      }
    } catch(error) {
      warn(`Exception with validation: ${validation} ${error}`, false, {
        id: 'ember-paper-compute-validation-message'
      });
    }
  });

  // error messages array
  let errors = get(this, 'errors') || [];

  assert('`errors` must be an array', isArray(errors));

  messages.push(...errors.map((e) => {
    return get(e, 'message') ? e : { message: e };
  }));

  return messages;
}

export function notifyValidityChange() {
  const isValid = get(this, 'isValid');
  const lastIsValid = get(this, 'lastIsValid');
  const isTouched = get(this, 'isTouched');
  const lastIsTouched = get(this, 'lastIsTouched');
  const isInvalidAndTouched = get(this, 'isInvalidAndTouched');

  if (
    lastIsValid !== isValid
    || lastIsTouched !== isTouched
  ) {
    invokeAction(this, 'onValidityChange', {
      elementId: get(this, 'elementId'),
      isValid,
      isTouched,
      isInvalidAndTouched
    });

    set(this, 'lastIsValid', isValid);
    set(this, 'lastIsTouched', isTouched);
  }
}

export default {
  buildComputedValidationMessages,
  notifyValidityChange
};
