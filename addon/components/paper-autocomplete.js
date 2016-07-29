import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';

const { computed, inject } = Ember;
/*
 * @name paper-autocomplete
 *
 * @description
 *     Provides material design autocomplete.
 *
 */
export default PowerSelect.extend({
  util: inject.service(),
  constants: inject.service(),
  triggerComponent: 'paper-autocomplete-trigger',
  extra: computed('labelPath', 'label', function() {
    return { labelPath: this.get('labelPath'), label: this.get('label') };
  }),
  onchange: computed.alias('onChange'),
  actions: {
    onFocus(event) {
      this.send('activate');
      this.publicAPI.actions.open(event);
      let action = this.get('onfocus');
      if (action) {
        action(this.publicAPI, event);
      }
    },
    onCreate(text) {
      if (this.get('onCreate')) {
        this.get('onCreate')(text);
      }
      this.publicAPI.actions.close();
    }
  },
  concatenatedDropdownClasses: ['md-autocomplete-suggestions-container md-virtual-repeat-container']
});
