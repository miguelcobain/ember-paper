import Ember from 'ember';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';

const { computed } = Ember;

export default BasicTrigger.extend({
  tagName: 'md-select',
  attributeBindings: ['disabledAttr:disabled', 'required'],
  disabledAttr: computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  })
});
