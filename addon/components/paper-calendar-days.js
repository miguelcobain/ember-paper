import Ember from 'ember';
import PowerCalendarDays from 'ember-power-calendar/components/power-calendar/days';

const { computed } = Ember;

export default PowerCalendarDays.extend({
  weekdaysLetters: computed('weekdaysNames', function() {
    return this.get('weekdaysNames').map((name) => name.charAt(0));
  })
});
