/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';
import { indexOfOption } from 'ember-power-select/utils/group-utils';

const { assert, computed, inject, isNone } = Ember;

/**
 * @class PaperAutocomplete
 * @extends PowerSelectComponent
 */
export default PowerSelect.extend({
  util: inject.service(),
  constants: inject.service(),
  triggerComponent: 'paper-autocomplete-trigger',
  contentComponent: 'paper-autocomplete-content',
  optionsComponent: 'paper-autocomplete-options',
  concatenatedDropdownClasses: ['md-autocomplete-suggestions-container md-virtual-repeat-container'],

  extra: computed('labelPath', 'label', function() {
    return this.getProperties('label', 'labelPath');
  }),
  onfocus: computed.alias('onFocus'),
  onblur: computed.alias('onBlur'),
  onchange: computed.alias('onSelectionChange'),

  searchText: '',
  onSearchTextChange: computed.alias('oninput'),

  // Don't automatically highlight any option
  defaultHighlighted: null,

  init() {
    assert('{{paper-autocomplete}} requires an `onSearchTextChange` function', this.get('onSearchTextChange') && typeof this.get('onSearchTextChange') === 'function');
    this._super(...arguments);
  },

  // Choose highlighted item on key Tab
  _handleKeyTab(e) {
    let publicAPI = this.get('publicAPI');
    if (publicAPI.isOpen && publicAPI.highlighted !== undefined) {
      publicAPI.actions.choose(publicAPI.highlighted, e);
    }
  },

  actions: {

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
    },

    onInput(event) {
      let publicAPI = this.get('publicAPI');

      if (!publicAPI.isOpen && event.type !== 'change') {
        publicAPI.actions.open(event);
      }
      return this._super(...arguments);
    },

    onCreate(text) {
      if (this.get('onCreate')) {
        this.get('onCreate')(text);
      }
      this.get('publicAPI').actions.close();
    },

    scrollTo(option) {
      if (!self.document || !option) {
        return;
      }
      let publicAPI = this.get('publicAPI');
      let optionsList = self.document.getElementById(`ember-power-select-options-${publicAPI.uniqueId}`);

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
