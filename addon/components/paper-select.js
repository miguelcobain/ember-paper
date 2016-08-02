import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';

let { computed } = Ember;

export default PowerSelect.extend({
  tagName: 'md-input-container',
  onchange: computed.alias('onChange'),
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-trigger',
  beforeOptionsComponent: 'paper-select-search',
  searchEnabled: false
});
