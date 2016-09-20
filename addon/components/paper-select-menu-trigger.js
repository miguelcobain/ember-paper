import Ember from 'ember';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';

const { computed } = Ember;

export default BasicTrigger.extend({
  tagName: 'md-select',
  attributeBindings: [
    'role',
    'tabIndex:tabindex',
    'dropdownId:aria-controls',
    'ariaLabel:aria-label',
    'ariaLabelledBy:aria-labelledby',
    'ariaDescribedBy:aria-describedby',
    'aria-disabled',
    'aria-expanded',
    'aria-haspopup',
    'aria-invalid',
    'aria-pressed',
    'aria-required',
    'disabled:disabled'
  ],
  disabled: computed('disabledProxy', function() {
    return this.get('disabledProxy') ? this.get('disabledProxy') : undefined;
  }),
});