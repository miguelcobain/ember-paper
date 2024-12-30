/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';
import Validation from '../lib/validation';
import { A } from '@ember/array';

/**
 * @class PaperInput
 * @extends Component
 */
export default class PaperInput extends Focusable {
  /**
   * tracks the validity of an input.
   *
   * @type {Validation}
   * @private
   */
  validation;

  /**
   * A unique id to identify the input element.
   *
   * @type{string}
   * @readonly
   */
  inputElementId;
  /**
   * Stores a reference to the component's input element.
   *
   * @type {HTMLInputElement}
   * @private
   */
  inputElement;
  /**
   * The parent this component is bound to.
   *
   * @type {PaperRadioGroup|PaperForm|PaperItem|PaperTabs}
   * @private
   */
  parent;
  /**
   * Marks whether the component should register itself to the supplied parent.
   *
   * @type {Boolean}
   * @public
   */
  shouldRegister;
  /**
   * Marks whether the component should skip being proxied.
   *
   * @type {Boolean}
   * @public
   */
  skipProxy;
  /**
   * iconComponent specifies the icon component to use.
   *
   * @type {string}
   * @readonly
   * @default "paper-icon"
   */
  iconComponent;
  /**
   * type specifies the input's type. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types MDN}
   * for a list of available input types.
   *
   * @type {string}
   * @readonly
   * @default "text"
   */
  type;
  /**
   * used to calculate how much to grow a textarea by.
   *
   * @type {number}
   * @private
   */
  @tracked lineHeight;

  /**
   * @constructor
   * @param owner
   * @param args
   */
  constructor(owner, args) {
    super(owner, args);

    this.iconComponent = this.args.iconComponent || 'paper-icon';
    this.type = this.args.type || 'text';
    const elementId =
      this.args.elementId || this.args.inputElementId || guidFor(this);
    this.inputElementId = this.args.inputElementId || `input-${elementId}`;
    this.lineHeight = this.args.lineHeight || null;
    this.shouldRegister = this.args.shouldRegister ?? true;

    // Construct Input Validation and pass through of custom attributes.
    this.validation = new Validation(
      elementId,
      this.args.onValidityChange || null,
      this.args.validations,
      this.args.customValidations,
      this.args.errors,
      this.args.errorMessages,
      this.args.isTouched
    );

    let parentComponent = this.args.parentComponent;
    if (parentComponent && this.shouldRegister) {
      this.parent = parentComponent;
    }

    assert(
      '<PaperInput> requires an `onChange` action or null for no action.',
      this.args.onChange !== undefined
    );
  }

  /**
   * Performs any required DOM setup.
   *
   * @param {HTMLElement} element - the node that has been added to the DOM.
   */
  @action didInsertNode(element) {
    this.registerListeners(element);

    let inputElement = element.querySelector('input, textarea');
    this.inputElement = inputElement;
    this.validation.didInsertNode(inputElement);

    // setValue ensures that the input value is the same as this.value
    this.setValue(this.value);
    this.growTextarea();

    if (this.args.textarea) {
      window.addEventListener('resize', this.growTextarea.bind(this));
    }

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.registerChild(this);
    }
  }

  /**
   * didUpdateNode is called when tracked component attributes change.
   */
  @action didUpdateNode() {
    if (this.args.errors) {
      this.validation.errors = this.args.errors;
    }

    // setValue ensures that the input value is the same as this.value
    this.setValue(this.value);
    this.growTextarea();
  }

  /**
   * Performs any required DOM teardown.
   *
   * @param {HTMLElement} element - the node to be removed from the DOM.
   */
  @action willDestroyNode(element) {
    this.unregisterListeners(element);

    if (this.args.textarea) {
      window.removeEventListener('resize', this.growTextarea.bind(this));
    }
  }

  /**
   * lifecycle hook to perform non-DOM related teardown.
   */
  willDestroy() {
    super.willDestroy(...arguments);

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.unregisterChild(this);
    }
  }

  /**
   * isBlock adds css class `md-block` which sets `display: block`.
   *
   * This indirection is required to maintain api compatibility as @block is
   * reserved by glimmer.
   *
   * @returns {boolean}
   */
  get isBlock() {
    return this.args.block || false;
  }

  /**
   * This is a little bit of a hack to un-proxy the values in args so that we
   * can track all changes. As users can define dynamic validations, we need to
   * be able to account for random args coming in.
   *
   * @returns {Object}
   */
  get params() {
    return { ...this.args };
  }

  /**
   * returns an array of errors supplied as an argument to the component.
   *
   * @returns {A}
   */
  get errors() {
    return this.args.errors || A([]);
  }

  /**
   * value returns the value passed in to the component, or an empty string if
   * undefined.
   *
   * @returns {string}
   */
  get value() {
    return this.args.value || '';
  }

  /**
   * returns true if we have a non-empty value, or is considered natively
   * invalid.
   *
   * @returns {boolean}
   */
  get hasValue() {
    return !isEmpty(this.value) || this.validation.isNativeInvalid;
  }

  /**
   * returns true if a label has been supplied, or if the input is focused.
   *
   * @returns {boolean}
   */
  get shouldAddPlaceholder() {
    // if input has label, only add placeholder when focused
    return isEmpty(this.args.label) || this.focused;
  }

  /**
   * returns the current number of characters that {@link value} contains.
   *
   * @returns {number}
   */
  get currentLength() {
    return this.value ? this.value.length : 0;
  }

  /**
   * returns true if icon has been passed in to the component.
   *
   * @returns {boolean}
   */
  get hasLeftIcon() {
    return !isEmpty(this.args.icon);
  }

  /**
   * returns true if iconRight has been passed in to the component.
   *
   * @returns {boolean}
   */
  get hasRightIcon() {
    return !isEmpty(this.args.iconRight);
  }

  /**
   * minRows returns the user specified minimum number of rows.
   *
   * @returns {number}
   * @default 0
   */
  get minRows() {
    if (this.args.passThru && this.args.passThru.rows) {
      return this.args.passThru.rows;
    }

    return 0;
  }

  /**
   * minRows returns the user specified maximum number of rows.
   *
   * @returns {number}
   * @default Number.MAX_VALUE
   */
  get maxRows() {
    if (this.args.passThru && this.args.passThru.maxRows) {
      return this.args.passThru.maxRows;
    }

    return Number.MAX_VALUE;
  }

  /**
   * calculates and grows a text area based on line-height.
   */
  growTextarea() {
    if (this.args.textarea) {
      let inputElement = this.inputElement;

      inputElement.classList.add('md-no-flex');
      inputElement.setAttribute('rows', '1');

      let minRows = this.minRows;
      let height = this.getHeight(inputElement);
      if (minRows) {
        let lineHeight = this.lineHeight;
        if (!lineHeight) {
          inputElement.style.minHeight = '0';
          lineHeight = this.inputElement.clientHeight;
          inputElement.style.minHeight = null;
        }
        if (lineHeight) {
          height = Math.max(height, lineHeight * minRows);
        }
        let proposedHeight = Math.round(height / lineHeight);
        let maxRows = this.maxRows;
        let rowsToSet = Math.min(proposedHeight, maxRows).toString();

        inputElement.style.height = `${lineHeight * rowsToSet}px`;
        inputElement.setAttribute('rows', rowsToSet);

        if (proposedHeight >= maxRows) {
          inputElement.classList.add('md-textarea-scrollable');
        } else {
          inputElement.classList.remove('md-textarea-scrollable');
        }

        this.lineHeight = lineHeight;
      } else {
        inputElement.style.height = 'auto';
        inputElement.scrollTop = 0;
        let height = this.getHeight(inputElement);
        if (height) {
          inputElement.style.height = `${height}px`;
        }
      }

      inputElement.classList.remove('md-no-flex');
    }
  }

  /**
   * returns the input elements current height.
   *
   * @param {HTMLInputElement} inputElement
   * @returns {number}
   */
  getHeight(inputElement) {
    let { offsetHeight } = inputElement;
    let line = inputElement.scrollHeight - offsetHeight;
    return offsetHeight + (line > 0 ? line : 0);
  }

  /**
   * pushes the given value into the input field.
   *
   * @param {*} value
   */
  setValue(value) {
    // normalize falsy values to empty string
    value = isEmpty(value) ? '' : value;

    if (this.inputElement.value !== value) {
      this.inputElement.value = value;
    }

    // Calculate Input Validity
    this.validation.value = value;
    this.validation.validate(this.args);
    this.validation.notifyOnChange();
  }

  /**
   * handleInput is called when input is received.
   * Calls onChange if supplied.
   *
   * @param {Event} e - the input event.
   */
  @action handleInput(e) {
    if (this.args.onChange) {
      this.args.onChange(e.target.value);
    }

    if (this.isDestroyed) {
      return;
    }

    // setValue below ensures that the input value is the same as this.value
    this.setValue(this.value);
    this.growTextarea();
  }

  /**
   * handleBlur is called when the input element has lost focus.
   * Calls onBlur if supplied.
   *
   * @param {Event} e - the input event.
   */
  @action handleBlur(e) {
    if (this.args.onBlur) {
      this.args.onBlur(e);
    }

    this.validation.isTouched = true;
    this.validation.validate(this.args);
    this.validation.notifyOnValidityChange();
  }
}
