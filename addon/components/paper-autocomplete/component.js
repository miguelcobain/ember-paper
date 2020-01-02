import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import calculatePosition from 'ember-paper/utils/calculate-ac-position';

import ValidationMixin from 'ember-paper/mixins/validation-mixin';

import { assert } from '@ember/debug';

import { indexOfOption } from 'ember-power-select/utils/group-utils';
@tagName('')
@layout(template)
class PaperAutocomplete extends Component.extend(ValidationMixin) {

  isTouched = false;

  init() {
    this._initComponent();
    super.init(...arguments);
  }

  // Init autocomplete component
  _initComponent() {
    let { onSearchTextChange, onSelectionChange } = this;

    let hasTextChange = onSearchTextChange && typeof onSearchTextChange === 'function';
    let hasSelectionChange = onSelectionChange && typeof onSelectionChange === 'function';

    assert('<PaperAutocomplete> requires at least one of the `@onSelectionChange` or `@onSearchTextChange` functions to be provided.', hasTextChange || hasSelectionChange);
  }

  @action
  _onChange() {
    if (this.onSelectionChange) {
      this.onSelectionChange(...arguments);
    }
  }

  calculatePosition = calculatePosition;

  @computed('onSearchTextChange', 'onSelectionChange')
  get validationProperty() {
    if (this.onSearchTextChange) {
      return 'searchText';
    } else {
      return 'selected';
    }
  }

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
