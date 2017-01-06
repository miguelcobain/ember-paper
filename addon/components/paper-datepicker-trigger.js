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

  formattedDate: computed('selectedDate', 'displayFormat', function() {
    let { selectedDate, displayFormat } = this.getProperties('selectedDate', 'displayFormat');

    if (!selectedDate) {
      return null;
    }

    return moment(selectedDate).format(displayFormat);
  }).readOnly()
});
