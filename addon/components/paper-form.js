import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

/**
 * @class PaperForm
 * @extends Component
 */
export default class PaperForm extends Component {
  /**
   * inputComponent specifies the component to be yielded as an input field.
   * @type {string}
   */
  inputComponent;
  /**
   * submitButtonComponent specifies the component to be yielded as a submit button.
   * @type {string}
   */
  submitButtonComponent;
  /**
   * selectComponent specifies the component to be yielded as a select field.
   * @type {string}
   */
  selectComponent;
  /**
   * autocompleteComponent specifies the component to be yielded as an autocomplete field.
   * @type {string}
   */
  autocompleteComponent;

  /**
   * Set of form components
   * @type {A}
   */
  @tracked children = A([]);
  /**
   * Used to track whether the forms validity has changed from the last check in.
   * @type {boolean}
   */
  @tracked lastIsTouched = false;
  /**
   * Used to track whether the forms validity has changed from the last check in.
   * @type {boolean}
   */
  @tracked lastIsValid = false;

  constructor() {
    super(...arguments);

    this.inputComponent = this.args.inputComponent || 'paper-input';
    this.submitButtonComponent =
      this.args.submitButtonComponent || 'paper-button';
    this.selectComponent = this.args.selectComponent || 'paper-select';
    this.autocompleteComponent =
      this.args.autocompleteComponent || 'paper-autocomplete';
  }

  /**
   * Registers a child form component
   * @param {Component} child - The form component to register
   */
  @action registerChild(child) {
    this.children.pushObject(child);
  }
  /**
   * Removes a registered child form component
   * @param {Component} child - The form component to unregister
   */
  @action unregisterChild(child) {
    this.children.removeObject(child);
  }

  get isValid() {
    return !this.isInvalid;
  }

  get isInvalid() {
    return this.children.isAny('isInvalid');
  }

  get isTouched() {
    return this.children.isAny('isTouched');
  }

  get isInvalidAndTouched() {
    return this.isInvalid && this.isTouched;
  }

  @action submit(event) {
    this.localOnSubmit();
    event.preventDefault();
  }

  @action localOnValidityChange() {
    if (
      this.lastIsValid !== this.isValid ||
      this.lastIsTouched !== this.isTouched
    ) {
      if (this.args.onValidityChange) {
        this.args.onValidityChange(
          this.isValid,
          this.isTouched,
          this.isInvalidAndTouched
        );
      }

      this.lastIsValid = this.isValid;
      this.lastIsTouched = this.isTouched;
    }
  }

  @action localOnSubmit() {
    if (this.isInvalid) {
      console.debug('form is invalid');
      this.children.setEach('isTouched', true);
      if (this.args.onInvalid) {
        this.args.onInvalid();
      }
    } else {
      console.debug('form is submitted');
      if (this.args.onSubmit) {
        this.args.onSubmit();
      }
      this.children.setEach('isTouched', false);
    }
  }
}
