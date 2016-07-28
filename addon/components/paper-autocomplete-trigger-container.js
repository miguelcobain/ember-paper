import Ember from 'ember';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';

const { computed } = Ember;

export default BasicTrigger.extend({
  attributeBindings: ['label:md-floating-label','disabled:disabled'],
  disabled: computed('disabledProxy', function() {
    return this.get('disabledProxy') ? this.get('disabledProxy') : undefined;
  })
});