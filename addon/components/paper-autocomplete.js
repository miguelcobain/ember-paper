/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';
import { indexOfOption } from 'ember-power-select/utils/group-utils';

const { computed, inject } = Ember;

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
    return { labelPath: this.get('labelPath'), label: this.get('label') };
  }),

  onchange: computed.alias('onChange'),
  onfocus: computed.alias('onFocus'),
  onblur: computed.alias('onBlur'),

  // Don't automatically highlight any option
  defaultHighlighted: null,

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
      this.publicAPI.actions.open(event);
      let action = this.get('onfocus');
      if (action) {
        action(this.publicAPI, event);
      }
    },

    onBlur(event) {
      this.send('deactivate');
      let action = this.get('onblur');
      if (action) {
        action(this.publicAPI, event);
      }
    },

    onCreate(text) {
      if (this.get('onCreate')) {
        this.get('onCreate')(text);
      }
      this.publicAPI.actions.close();
    },

    scrollTo(option /*, e */) {
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
