import Ember from 'ember';
import TriggerComponent from 'ember-power-select/components/power-select/trigger';

const { computed } = Ember;

export default TriggerComponent.extend({
  tagName: 'md-select-value',
  classNames: ['md-select-value'],
  classNameBindings: ['isPlaceholder:md-select-placeholder'],
  isPlaceholder: computed('placeholder', 'select.selected', function() {
    return this.get('placeholder') && !this.get('select.selected');
  })
});
