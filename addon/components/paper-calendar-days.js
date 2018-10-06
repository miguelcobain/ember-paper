import PowerCalendarDaysComponent from 'ember-power-calendar/components/power-calendar/days';
import layout from '../templates/components/paper-calendar-days';

import { computed } from '@ember/object';
import { A } from '@ember/array';

export default PowerCalendarDaysComponent.extend({
  layout,
  tagName: 'md-calendar-month',

  months: computed('weeks', function() {
    let months = A();

    for (let i = 0; i < 10; i++) {
      months.push({
        weeks: this.get('weeks')
      });
    }

    return months;
  }),

  actions: {
    loadAbove() {
      let months = this.get('months');

      months.unshiftObjects(months);
    },

    loadBelow() {

      let months = this.get('months');

      months.pushObjects(months);
    }
  }
});
