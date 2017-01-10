import Ember from 'ember';
import PowerCalendarDays from 'ember-power-calendar/components/power-calendar/days';

const { computed } = Ember;

export default PowerCalendarDays.extend({
  weekdaysLetters: computed.map('weekdaysMin', function(name) {
    return name.charAt(0);
  }),

  weekdaysNames: computed('localeStartOfWeek', 'weekdaysLetters', function() {
    let { localeStartOfWeek, weekdaysLetters } = this.getProperties('localeStartOfWeek', 'weekdaysLetters');
    return weekdaysLetters.slice(localeStartOfWeek).concat(weekdaysLetters.slice(0, localeStartOfWeek));
  })
});
