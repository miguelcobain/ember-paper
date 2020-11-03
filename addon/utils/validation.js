import { assert, warn } from '@ember/debug';
import { isArray, A } from '@ember/array';
import { get } from '@ember/object';
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
  const validators = A();
  const messages = A();

  // built-in validations
  validators.pushObjects(this.get('validations'));

  // custom validations
  let customValidators = this.get('customValidations');

  assert('`customValidations` must be an array', isArray(customValidators));

  validators.pushObjects(customValidators);

  // execute validations
  let currentValue = this.get(property);

  validators.forEach((validation) => {
    assert('validation must include a `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');

    try {
      let valParam = get(validation, 'param');
      let paramValue = valParam ? this.get(valParam) : undefined;

      if (!validation.validate(currentValue, paramValue)) {
        const message = this.get(`errorMessages.${valParam}`) || get(validation, 'message');

        messages.pushObject({
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
  let errors = this.get('errors') || [];

  assert('`errors` must be an array', isArray(errors));

  messages.pushObjects(errors.map((e) => {
    return get(e, 'message') ? e : { message: e };
  }));

  return messages;
}

export function notifyValidityChange() {
  const isValid = this.get('isValid');
  const lastIsValid = this.get('lastIsValid');
  const isTouched = this.get('isTouched');
  const lastIsTouched = this.get('lastIsTouched');
  const isInvalidAndTouched = this.get('isInvalidAndTouched');

  if (
    lastIsValid !== isValid
    || lastIsTouched !== isTouched
  ) {
    invokeAction(this, 'onValidityChange', {
      elementId: this.get('elementId'),
      isValid,
      isTouched,
      isInvalidAndTouched
    });

    this.set('lastIsValid', isValid);
    this.set('lastIsTouched', isTouched);
  }
}

export default {
  buildComputedValidationMessages,
  notifyValidityChange
};
