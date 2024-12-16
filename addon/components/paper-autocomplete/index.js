import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position';
import { indexOfOption } from 'ember-power-select/utils/group-utils';
import Validation from '../../lib/validation';

export default class PaperAutocomplete extends Component {
  /**
   * tracks the validity of an input.
   *
   * @type {Validation}
   * @private
   */
  validation;

  /**
   * Stores a reference to the component's input element.
   *
   * @type {HTMLInputElement}
   * @private
   */
  #inputElement;
  /**
   * provides a numeric offset that needs to be calculated on text boxes
   *
   * @type {number}
   * @private
   */
  #inputOffset;
  /**
   * the public api provided from the PowerSelect component.
   *
   * @type {Object}
   * @private
   */
  publicAPI;

  /**
   * stores local state of search text if not being passed up.
   *
   * @type {string}
   * @private
   */
  @tracked _searchText;

  constructor(owner, args) {
    super(owner, args);

    this.#inputOffset = 0;
    this.searchText = '';

    const elementId =
      this.args.elementId || this.args.inputElementId || guidFor(this);

    // Construct Input Validation and pass through of custom attributes.
    this.validation = new Validation(
      elementId,
      this.args.onValidityChange || null,
      this.args.validations,
      this.args.customValidations,
      this.args.errors,
      this.args.errorMessages,
      this.args.isTouched ?? false
    );

    let onSearchTextChange = this.args.onSearchTextChange;
    let hasTextChange =
      onSearchTextChange && typeof onSearchTextChange === 'function';

    let onSelectionChange = this.args.onSelectionChange;
    let hasSelectionChange =
      onSelectionChange && typeof onSelectionChange === 'function';

    assert(
      '<PaperAutocomplete> requires at least one of the `@onSelectionChange` or `@onSearchTextChange` functions to be provided.',
      hasTextChange || hasSelectionChange
    );
  }

  /**
   * Performs any required DOM setup.
   *
   * @param {HTMLElement} element - the node that has been added to the DOM.
   */
  @action didInsertNode(element) {
    this.#inputElement = element.querySelector('input');
    this.validation.didInsertNode(this.#inputElement);

    this.calculateTopOffset(element);
  }

  /**
   * computes input element position adjustment as text boxes have the default
   * material design padding and margin applied to them.
   *
   * @param {HTMLElement} element
   */
  calculateTopOffset(element) {
    if (this.#inputElement.type === 'text') {
      let containerBottomPadding = 0;
      let containerBottomMargin = 0;
      const container = element.querySelector('md-input-container');
      if (container) {
        const cStyles = window.getComputedStyle(container);
        containerBottomPadding = parseFloat(cStyles.paddingBottom);
        containerBottomMargin = parseFloat(cStyles.marginBottom);
      }

      let spacerHeight = 0;
      const spacer = element.querySelector('.md-errors-spacer');
      if (spacer) {
        spacerHeight = spacer.offsetHeight;
      }

      this.#inputOffset =
        containerBottomPadding + containerBottomMargin + spacerHeight;
    }
  }

  /**
   * didUpdateNode is called when tracked component attributes change.
   */
  @action didUpdateNode() {
    if (this.args.errors) {
      this.validation.errors = this.args.errors;
    }

    // Calculate Input Validity
    this.validation.value = this.value;
    this.validation.validate(this.args);
    this.validation.notifyOnChange();
  }

  /**
   * searchText returns the input used in an attempt to find a matching option.
   *
   * @returns {string}
   */
  get searchText() {
    return this.args.searchText ?? this._searchText;
  }
  /**
   * sets search text for when a function isn't
   *
   * @param {string} text
   */
  set searchText(text) {
    this._searchText = text;
  }

  /**
   * value returns the value passed in to the component, or an empty string if
   * undefined.
   *
   * @returns {string}
   */
  get value() {
    if (this.args.onSearchTextChange) {
      return this.searchText;
    }

    return this.args.selected ?? '';
  }

  @action calculatePosition(trigger, content, destination, options) {
    let pos = calculatePosition(trigger, content, destination, options);
    if (pos.verticalPosition === 'below') {
      pos.style.top -= this.#inputOffset;
    }

    return pos;
  }

  @action handleOnChange() {
    if (this.args.onSelectionChange) {
      this.args.onSelectionChange(...arguments);
    }
  }

  @action handleClose() {
    this.validation.isTouched = true;
    this.validation.notifyOnValidityChange();

    if (this.args.onClose) {
      return this.args.onClose(...arguments);
    }
  }

  @action handleOpen(select, e) {
    if (e && e.type === 'mousedown') {
      return false;
    }

    this.validation.notifyOnValidityChange();

    if (this.args.onOpen) {
      return this.args.onOpen(...arguments);
    }
  }

  @action handleFocus(select, e) {
    if (
      (e.target.classList.contains('ember-paper-autocomplete-search-input') ||
        e.target.classList.contains('md-input')) &&
      !select.selected
    ) {
      select.actions.open(e);
    }

    if (this.args.onFocus) {
      return this.args.onFocus(...arguments);
    }
  }

  @action handleBlur() {
    this.validation.notifyOnValidityChange();

    if (this.args.onBlur) {
      this.args.onBlur(...arguments);
    }
  }

  @action handleOnInput(term, select, e) {
    if (select.selected) {
      select.actions.select(null);
    }

    if (this.args.onSearchTextChange) {
      this.args.onSearchTextChange(term, select, e);
    } else {
      this.searchText = term;
    }

    if (!select.isOpen && e.type !== 'change') {
      select.actions.open(e);
    }

    this.validation.value = this.value;
    this.validation.notifyOnValidityChange();

    if (this.args.onInput) {
      this.args.onInput(...arguments);
    }

    return term;
  }

  @action handleOnCreate() {
    let text = this.publicAPI.searchText;
    if (this.args.onCreate) {
      this.args.onCreate(text, this.publicAPI);
    }
    this.publicAPI.actions.close();
  }

  @action handleScrollTo(option, select) {
    let optionsList = document.getElementById(
      `ember-power-select-options-${this.publicAPI.uniqueId}`
    );
    if (!optionsList) {
      return;
    }

    optionsList = optionsList.parentNode;

    let index = indexOfOption(select.results, option);
    if (index === -1) {
      return;
    }

    let optionElement = optionsList.querySelector(
      `[data-option-index="${index}"]`
    );
    if (!optionElement) {
      return;
    }

    let optionTopScroll = optionElement.offsetTop;
    let optionBottomScroll = optionTopScroll + optionElement.offsetHeight;

    if (optionBottomScroll > optionsList.offsetHeight + optionsList.scrollTop) {
      optionsList.scrollTop = optionBottomScroll - optionsList.offsetHeight;
    } else if (optionTopScroll < optionsList.scrollTop) {
      optionsList.scrollTop = optionTopScroll;
    }
  }
}
