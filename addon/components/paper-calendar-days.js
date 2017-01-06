import Ember from 'ember';
import layout from '../templates/components/paper-calendar-days';
import PowerCalendarDays from 'ember-power-calendar/components/power-calendar/days';

const { computed } = Ember;

export default PowerCalendarDays.extend({
  layout,

  weekdaysLetters: computed.map('weekdaysNames', function(name) {
    return name.charAt(0);
  })
});
