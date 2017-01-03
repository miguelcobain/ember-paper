import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';

export default BasicTrigger.extend({
  tagName: 'md-datepicker',
  classNameBindings: ['dropdown.isOpen:md-datepicker-open']
});
