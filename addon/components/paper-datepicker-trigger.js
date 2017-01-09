import Ember from 'ember';
import moment from 'moment';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';
import layout from '../templates/components/paper-datepicker-trigger';

const { computed } = Ember;

export default BasicTrigger.extend({
  layout,

  tagName: 'md-datepicker',
  classNameBindings: ['dropdown.isOpen:md-datepicker-open'],

  displayFormat: 'L',

  formattedDate: computed('selected', 'displayFormat', function() {
    let { selected, displayFormat } = this.getProperties('selected', 'displayFormat');

    if (!selected) {
      return null;
    }

    return moment(selected).format(displayFormat);
  }).readOnly()
});
