/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { alias } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { defineProperty, computed } from '@ember/object';
import PowerSelect from 'ember-power-select/components/power-select';
import layout from '../templates/components/paper-autocomplete';
import ValidationMixin from 'ember-paper/mixins/validation-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import { indexOfOption } from 'ember-power-select/utils/group-utils';
import calculatePosition from '../utils/calculate-ac-position';

/**
 * @class PaperAutocomplete
 * @extends PowerSelectComponent
 */
export default PowerSelect.extend(ValidationMixin, ChildMixin, {
  layout,
  calculatePosition,

  util: service(),
  constants: service(),
  triggerComponent: 'paper-autocomplete-trigger',
  contentComponent: 'paper-autocomplete-content',
  optionsComponent: 'paper-autocomplete-options',
  triggerWrapperComponent: 'paper-autocomplete-trigger-container',
  onfocus: alias('onFocus'),
  onblur: alias('onBlur'),
  onchange: null,
  oninput: null,
  searchText: '',
  defaultHighlighted: null, // Don't automatically highlight any option
  _onChangeNop() { },

  extra: computed('labelPath', 'label', function() {
    return this.getProperties('label', 'labelPath');
  }),

  validationProperty: computed('onSearchTextChange', 'onSelectionChange', function() {
    if (this.get('onSearchTextChange')) {
      return 'searchText';
    } else {
      return 'selected';
    }
  }),

  concatenatedDropdownClasses: computed('dropdownClass', function() {
    let classes = ['md-autocomplete-suggestions-container md-virtual-repeat-container'];
    if (this.get('dropdownClass')) {
      classes.push(this.get('dropdownClass'));
    }
    return classes.join(' ');
  }),

  init() {
    this._initComponent();
    this._super(...arguments);
  },

  // Init autocomplete component
  _initComponent() {
    let {
      onSearchTextChange,
      onSelectionChange
    } = this.getProperties('onSearchTextChange', 'onSelectionChange');

    let hasTextChange = onSearchTextChange && typeof onSearchTextChange === 'function';
    let hasSelectionChange = onSelectionChange && typeof onSelectionChange === 'function';

    assert('{{paper-autocomplete}} requires at least one of the `onSelectionChange` or `onSearchTextChange` functions to be provided.', hasTextChange || hasSelectionChange);

    let aliasOnChangeDepKey = hasSelectionChange ? 'onSelectionChange' : '_onChangeNop';
    defineProperty(this, 'oninput', alias('onSearchTextChange'));
    defineProperty(this, 'onchange', alias(aliasOnChangeDepKey));
  },

  // Choose highlighted item on key tab
  _handleKeyTab(e) {
    let publicAPI = this.get('publicAPI');
    if (publicAPI.isOpen && !isNone(publicAPI.highlighted)) {
      publicAPI.actions.choose(publicAPI.highlighted, e);
    }
    // e-p-s will close
    this._super(...arguments);
  },

  actions: {

    onTriggerMouseDown() {
      return false;
    },

    onFocus(event) {
      this.send('activate');
      let publicAPI = this.get('publicAPI');

      if (isNone(publicAPI.selected)) {
        publicAPI.actions.open(event);
      }

      let action = this.get('onfocus');
      if (action) {
        action(publicAPI, event);
      }
    },

    onBlur(event) {
      this.send('deactivate');
      let action = this.get('onblur');

      if (action) {
        action(this.get('publicAPI'), event);
      }

      this.notifyValidityChange();
    },

    onInput(event) {
      let publicAPI = this.get('publicAPI');

      if (!publicAPI.isOpen && event.type !== 'change') {
        publicAPI.actions.open(event);
      }

      this.notifyValidityChange();
      return this._super(...arguments);
    },

    onCreate(text) {
      if (this.get('onCreate')) {
        this.get('onCreate')(text);
      }
      this.get('publicAPI').actions.close();
    },

    scrollTo(option) {
      if (!document || !option) {
        return;
      }
      let publicAPI = this.get('publicAPI');
      let optionsList = document.getElementById(`ember-power-select-options-${publicAPI.uniqueId}`);

      if (!optionsList) {
        return;
      }

      let index = indexOfOption(publicAPI.results, option);
      if (index === -1) {
        return;
      }
      // Update the scroll index
      this.updateState({ scrollIndex: index });
    }
  }
});
