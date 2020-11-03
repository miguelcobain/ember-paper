import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking'
import calculatePosition from 'ember-paper/utils/calculate-ac-position';

import { invokeAction } from 'ember-invoke-action';
import { assert } from '@ember/debug';

import { indexOfOption } from 'ember-power-select/utils/group-utils';

import { buildComputedValidationMessages, notifyValidityChange } from 'ember-paper/utils/validation';
import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';

const validations = [
  requiredValidator,
  minValidator,
  maxValidator,
  minlengthValidator,
  maxlengthValidator
];

@tagName('')
@layout(template)
class PaperAutocomplete extends Component {

  @tracked
  isTouched = false;

  @computed('isTouched')
  get formHasBeenValidated () {
    return this.isTouched
  }

  set formHasBeenValidated (value) {
    this.isTouched = value
  }

  validations = validations;

  @tracked
  errorMessages

  @tracked
  customValidations = []

  @tracked
  errors = []

  @computed(
    'onSearchTextChange',
    'onSelectionChange',
    'searchText',
    'selected',
    'errors.[]',
    'customValidations.[]',
    'errorMessages',
    requiredValidator.param,
    minValidator.param,
    maxValidator.param,
    minlengthValidator.param,
    maxlengthValidator.param
  )
  get validationErrorMessages () {
    const validationProperty = this.onSearchTextChange ? 'searchText' : 'selected';

    return buildComputedValidationMessages.call(this, validationProperty)
  }

  @computed.bool('validationErrorMessages.length')
  hasErrorMessages

  @computed.reads('hasErrorMessages')
  isInvalid

  @computed.not('isInvalid')
  isValid

  init() {
    this._initComponent();
    super.init(...arguments);

    invokeAction(this, 'onRegister', this.get('elementId'), this.get('isValid'), this.get('isTouched'), this.get('isInvalidAndTouched'));
  }

  // Init autocomplete component
  _initComponent() {
    let { onSearchTextChange, onSelectionChange } = this;

    let hasTextChange = onSearchTextChange && typeof onSearchTextChange === 'function';
    let hasSelectionChange = onSelectionChange && typeof onSelectionChange === 'function';

    assert('<PaperAutocomplete> requires at least one of the `@onSelectionChange` or `@onSearchTextChange` functions to be provided.', hasTextChange || hasSelectionChange);
  }

  destroy () {
    const eltId = this.get('elementId')

    super.destroy(...arguments);

    invokeAction(this, 'onUnregister', eltId);
  }

  notifyValidityChange() {
    notifyValidityChange.call(this);
  }

  @action
  _onChange() {
    if (this.onSelectionChange) {
      this.onSelectionChange(...arguments);
    }
  }

  calculatePosition = calculatePosition;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.notifyValidityChange();
  }

  @action
  close() {
    this.didAnimateScale = false;
    this.set('isTouched', true);
    this.notifyValidityChange();

    if (this.onClose) {
      return this.onClose(...arguments);
    }
  }

  @action
  open(select, e) {
    if (e && e.type === 'mousedown') {
      return false;
    }
    this.didAnimateScale = false;
    this.notifyValidityChange();

    if (this.onOpen) {
      return this.onOpen(...arguments);
    }
  }

  @action
  focus(select, e) {
    if (
      (
        e.target.classList.contains('ember-paper-autocomplete-search-input')
        || e.target.classList.contains('md-input')
      )
      && !select.selected) {
      select.actions.open(e);
    }

    if (this.onFocus) {
      return this.onFocus(...arguments);
    }
  }

  @action
  blur() {
    this.notifyValidityChange();

    if (this.onBlur) {
      this.onBlur(...arguments);
    }
  }

  @action
  _onInput(term, select, e) {
    if (select.selected) {
      select.actions.select(null);
    }

    if (this.onSearchTextChange) {
      this.onSearchTextChange(term, select, e);
    } else {
      this.set('searchText', term);
    }

    if (!select.isOpen && e.type !== 'change') {
      select.actions.open(e);
    }

    this.notifyValidityChange();

    if (this.onInput) {
      this.onInput(...arguments);
    }

    return term;
  }

  @action
  _onCreate() {
    let text = this.publicAPI.searchText;
    if (this.onCreate) {
      this.onCreate(text, this.publicAPI);
    }
    this.publicAPI.actions.close();
  }

  @action
  scrollTo(option, select) {
    let optionsList = document.getElementById(`ember-power-select-options-${this.publicAPI.uniqueId}`);
    if (!optionsList) {
      return;
    }

    optionsList = optionsList.parentNode;

    let index = indexOfOption(select.results, option);
    if (index === -1) {
      return;
    }

    let optionElement = optionsList.querySelector(`[data-option-index="${index}"]`);
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

export default PaperAutocomplete;
