/**
 * @module ember-paper
 */
import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';

const { computed } = Ember;

/**
 * @class PaperSelect
 * @extends PaperInput
 */
export default PowerSelect.extend(FocusableMixin, {
  tagName: 'md-input-container',
  onchange: computed.alias('onChange'),
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-trigger',
  beforeOptionsComponent: 'paper-select-search',
  searchEnabled: false,
  attributeBindings: ['parentTabindex:tabindex'],
  classNameBindings: ['selected:md-input-has-value', 'focusedAndSelected:md-input-focused'],
  shouldShowLabel: computed.and('label', 'selected'),
  focusedAndSelected: computed.and('focused', 'selected')
});
