/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';

const { computed } = Ember;

/**
 * @class PaperSelect
 * @extends PaperInput
 */
export default PowerSelect.extend({
  tagName: 'md-input-container',
  onchange: computed.alias('onChange'),
  classNameBindings: ['selected:md-input-has-value', 'focused:md-input-focused'],
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-trigger',
  searchMessageComponent: 'paper-search-message',
  beforeOptionsComponent: 'paper-select-search',
  searchEnabled: false,
  focused: false,
  focusIn() {
    if (!this.get('disabled') && !this.get('focusOnlyOnKey') || !this.get('pressed')) {
      this.set('focused', true);
    }
  },
  focusOut() {
    this.set('focused', false);
  },
  shouldShowLabel: computed('focused', 'label', 'selected', function() {
    if (this.get('label')) {
      return this.get('focused') || this.get('selected');
    } else {
      return false;
    }
  })
});
