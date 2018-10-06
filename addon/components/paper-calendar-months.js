import Component from '@ember/component';
import layout from '../templates/components/paper-calendar-months';
import { inject } from '@ember/service';
import {
  add,
  isSame,
  isBefore,
  startOf,
  endOf
} from 'ember-power-calendar-utils';

 export default Component.extend({
  layout,

  powerCalendarService: inject('power-calendar'),

  numberOfYears: 5,

  years: computed('calendar', 'numberOfYears', function() {
    let today = this.get('powerCalendarService').getDate();
    let center = this.get('calendar.center');
    let numberOfYears = this.get('numberOfYears');

    let start = add(center, -numberOfYears, 'year');
    let end = add(center, numberOfYears, 'year');
    let year = start;

    let years = [];
    while (isBefore(year, end)) {
      years.push(this.buildYear(year, today, calendar));
      day = add(day, 1, 'year');
    }
    return days;
  }),

  buildYear(year, today, calendar) {
    let start = startOf(year, 'year');
    let end = endOf(year, 'year');
    let month = start;

    let months = [];
    while (isBefore(month, end)) {
      months.push(this.buildMonth(day, today, calendar));
      month = add(month, 1, 'month');
    }
  },

  buildMonth(month, today) {
    return {
      isToday: isSame(date, today, 'month'),
    }
  }
});
