import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';
import { isArray, A } from '@ember/array';
import { assert, warn } from '@ember/debug';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

/**
 * A validator provides a function that can validate the specified input.
 *
 * @typedef {Object} validator
 * @property {string} param - the input attribute this is validating.
 * @property {string} message - the error message to show to the end user if input is considered invalid.
 * @property {function} validate - the function to be called to validate the param's value against the param.
 */

/**
 * This callback is used to notify when the validity changes on the input field.
 *
 * @callback onValidityChange
 * @param {boolean} isValid - whether the input element is considered valid.
 * @param {string} elementId - The unique paper-input identifier.
 */

/**
 * Validation provides input validation.
 *
 * @class Validation
 */
export default class Validation {
  /**
   * id is returned on notifying on validity to enable unique identification of
   * the input that is in an invalid state.
   *
   * @type {string}
   * @private
   */
  #id;
  /**
   * #inputElement stores a reference to the input element for updating the
   * underlying value and checking the browser's native validity status.
   *
   * @type {HTMLInputElement}
   * @private
   */
  #inputElement;
  /**
   *
   * @type {onValidityChange|undefined}
   * @private
   */
  #onValidityChange = null;
  /**
   * an array of validators to be run to ascertain the input's validity.
   *
   * @type {validator[]}
   */
  #validators = defaultValidations();

  // State
  /**
   * Key-Value map of param to the message the user wants to override.
   * For example, `@errorMessages={{hash required="Address is required."}}`
   *
   * @type {A}
   */
  #errorMessageOverrides = A();
  /**
   * #previousErrors stores the last state of errors to be able to track and
   * notify on changes.
   *
   * @type {A}
   * @private
   */
  #previousErrors;
  /**
   * previousIsTouched stores the last state of isTouched to be able to track
   * and notify on changes.
   *
   * @type {boolean}
   * @private
   */
  #previousIsTouched = undefined;
  /**
   * previousIsValid stores the last state of isValid to be able to track and
   * notify on changes.
   *
   * @type {boolean}
   * @private
   */
  #previousIsValid = undefined;
  /**
   * previousValue stores the last state of value to be able to track and
   * notify on changes.
   *
   * @type {*}
   * @private
   */
  #previousValue = '';

  /**
   * an array of the latest validation error messages, suitable for end user
   * display.
   *
   * @type {A}
   * @public
   */
  @tracked errorMessages = A();
  /**
   * An array of the latest validation errors.
   * Can be overridden in order to supply your own external errors.
   *
   * @type {A}
   * @public
   */
  @tracked errors = A();
  /**
   * tracks if the input has been touched.
   * Useful for detecting when validation error messages should be displayed to
   * the end user.
   *
   * @type {boolean}
   * @public
   */
  @tracked isTouched = false;
  /**
   * value contains the datum to be validated.
   *
   * @type {any}
   * @public
   */
  @tracked value = null;

  /**
   * @constructor
   * @param {string} id - a unique identifier to identify the input element.
   * @param {onValidityChange} onValidityChange - callback to notify when a change has occurred to the validity of a field.
   * @param {validator[]|undefined} [validations] - validators to override the default set.
   * @param {validator[]|undefined} [customValidations] - validators to append to the default set.
   * @param {A|undefined} [errors] - input errors that should be reported.
   * @param {A|undefined} [errorMessageOverrides] - validation error message overrides.
   * @param {boolean|undefined} [isTouched] - a flag to mark the input as touched on creation.
   */
  constructor(
    id,
    onValidityChange,
    validations,
    customValidations,
    errors,
    errorMessageOverrides,
    isTouched
  ) {
    this.#id = id;

    if (validations) {
      this.#validators = validations
        .map((v) => v.param)
        .filter((v) => !isBlank(v));
    }
    if (customValidations) {
      assert(
        '`customValidations` must be an array',
        isArray(customValidations)
      );
      this.#validators.pushObjects(customValidations);
    }
    if (errorMessageOverrides) {
      this.#errorMessageOverrides = errorMessageOverrides;
    }
    if (isTouched) {
      this.isTouched = isTouched;
    }
    if (errors) {
      this.errors = errors;
    }

    assert(
      'Validation requires an `onValidityChange` action or null for no action.',
      onValidityChange !== undefined
    );
    this.#onValidityChange = onValidityChange;
  }

  /**
   * didInsertNode provides a way to push in an input element to track.
   *
   * This allows the practitioner to construct the validator for availability on
   * component creation, but where the node you need to track hasn't been
   * inserted into the DOM yet.
   *
   * @param {HTMLInputElement} inputElement
   */
  didInsertNode(inputElement) {
    this.#inputElement = inputElement;
  }

  /**
   * true if validation errors have been found.
   *
   * @return {boolean}
   */
  get hasErrorMessages() {
    return this.errorMessages.length > 0;
  }

  /**
   * The result of isInvalid is appropriate for controlling the display of
   * validation error messages. It also may be used to distinguish whether
   * the input would be considered valid after it is touched.
   *
   * @public
   * @return {boolean} Whether the input is or would be invalid.
   *    false: input is valid (touched or not), or is no longer rendered
   *    true: input has been touched and is invalid.
   */
  get isInvalid() {
    return this.hasErrorMessages || this.isNativeInvalid;
  }

  /**
   * returns true if the input element is considered valid.
   *
   * @return {boolean}
   */
  get isValid() {
    return !this.isInvalid;
  }

  /**
   * returns invalid based on the native input element's state of validity.
   *
   * @return {boolean}
   */
  get isNativeInvalid() {
    let inputElement = this.#inputElement;
    if (!inputElement) {
      return false;
    }

    if (inputElement.type === 'date' && inputElement.value === '') {
      // Chrome doesn't fire the onInput event when clearing the second and third date components.
      // This means that we won't see another event when badInput becomes false if the user is clearing
      // the date field.  The reported value is empty, though, so we can already mark it as valid.
      return false;
    }

    return (inputElement.validity && inputElement.validity.badInput) || false;
  }

  /**
   * returns true if the input is considered invalid and has been touched.
   *
   * @return {boolean}
   */
  get isInvalidAndTouched() {
    return this.isInvalid && this.isTouched;
  }

  /**
   * validate executes configured validators and sets an array of errors and
   * error messages for consumption.
   *
   * @param {Object} args - the values that are being supplied to the input.
   */
  validate(args) {
    let messages = A();

    let currentValue = this.value;
    this.#validators.forEach((v) => {
      assert(
        'validation must include a `validate(value)` function',
        v && v.validate && typeof v.validate === 'function'
      );
      try {
        let valParam = v.param;
        let paramValue = valParam ? args[valParam] : undefined;
        if (!v.validate(currentValue, paramValue)) {
          let message = this.#errorMessageOverrides[valParam] || v.message;
          messages.pushObject({
            message: fmt(message.string || message, paramValue, currentValue),
          });
        }
      } catch (error) {
        warn(`Exception with validation: ${v} ${error}`, false);
      }
    });

    // build the error messages array
    let errors = this.errors || [];
    assert('`errors` must be an array', isArray(errors));
    messages.pushObjects(
      errors.map((e) => {
        return e.message ? e : { message: e };
      })
    );

    this.errors = errors;
    this.errorMessages = messages;
  }

  /**
   * notifyOnChange will only notify if the value and errors have changed since
   * last notification check.
   *
   * If values have changed, falls through to {@link notifyOnValidityChange}.
   */
  notifyOnChange() {
    const previousErrors = this.#previousErrors;
    const errors = this.errors;
    const previousValue = this.#previousValue;
    const value = this.value;
    if (previousValue !== value || previousErrors !== errors) {
      this.notifyOnValidityChange();

      this.#previousErrors = errors;
      this.#previousValue = value;
    }
  }

  /**
   * notifyOnValidityChange calls the provided onValidityChange callback with
   * the value of valid and the id of the element to help track the validity of
   * certain inputs.
   */
  notifyOnValidityChange() {
    const prevIsValid = this.#previousIsValid;
    const isValid = this.isValid;
    const prevIsTouched = this.#previousIsTouched;
    const isTouched = this.isTouched;
    if (prevIsValid !== isValid || prevIsTouched !== isTouched) {
      if (this.#onValidityChange) {
        this.#onValidityChange(isValid, this.#id);
      }

      this.#previousIsValid = isValid;
      this.#previousIsTouched = isTouched;
    }
  }
}

/**
 * defaultValidations returns the default set of validations to run for an input.
 *
 * @return {validator[]}
 */
function defaultValidations() {
  return A([
    requiredValidator,
    minValidator,
    maxValidator,
    minlengthValidator,
    maxlengthValidator,
  ]);
}

/**
 * fmt provides an implementation of a format string that replaces %@ with the
 * passed in arguments. It replaces usage of `loc` which was deprecated in
 * `ember@v3.X`.
 *
 * @see https://github.com/emberjs/ember.js/blob/v3.22.2/packages/%40ember/string/index.ts
 * @param {string} str - the format string.
 * @param {string[]} formats - the ordered positional replacements.
 * @returns {string}
 */
function fmt(str, formats) {
  if (!Array.isArray(formats) || arguments.length > 2) {
    formats = Array.prototype.slice.call(arguments, 1);
  }

  // first, replace any ORDERED replacements.
  let idx = 0; // the current index for non-numerical replacements
  return str.replace(/%@([0-9]+)?/g, (_s, argIndex) => {
    let i = argIndex ? parseInt(argIndex, 10) - 1 : idx++;
    let r = i < formats.length ? formats[i] : undefined;
    return typeof r === 'string'
      ? r
      : r === null
      ? '(null)'
      : r === undefined
      ? ''
      : String(r);
  });
}
