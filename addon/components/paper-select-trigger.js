/**
 * @module ember-paper
 */
import Ember from 'ember';
import TriggerComponent from 'ember-power-select/components/power-select/trigger';
import layout from '../templates/components/paper-select-trigger';

const { NAME_KEY, computed } = Ember;

/**
 * @class PaperSelectTrigger
 * @extends Ember.Component
 */
const PaperComponent = TriggerComponent.extend({
  layout,
  tagName: 'md-select-value',
  classNames: ['md-select-value'],
  classNameBindings: ['isPlaceholder:md-select-placeholder'],
  isPlaceholder: computed('placeholder', 'label', 'select.selected', function() {
    return (this.get('placeholder') || this.get('label')) && !this.get('select.selected');
  })
});

PaperComponent[NAME_KEY] = 'paper-select-trigger';

export default PaperComponent;
