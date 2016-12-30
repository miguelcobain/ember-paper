import Ember from 'ember';
import moment from 'moment';

const { Component, computed } = Ember;

/**
 * @class PaperCalendarMonthInner
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'tbody',
  classNames: ['md-calendar-month'],

  /**
   * Moment format used in the month label.
   *
   * @property monthLabelFormat
   * @type string
   * @public
   */
  monthLabelFormat: 'MMM YYYY',

  /**
   * Full year number of the month displayed in this component.
   *
   * @property year
   * @type number
   * @public
   */
  year: null,

  /**
   * Number of the month number displayed in this component, from 1 (January) to 12 (December).
   *
   * @property year
   * @type number
   * @public
   */
  month: null,

  /**
   * @property firstDateOfMonth
   * @type Date
   * @private
   */
  firstDateOfMonth: computed('year', 'month', function() {
    return new Date(this.get('year'), this.get('month') - 1, 1);
  }),

  /**
   * Week day for the first day of the month, starting from 0 (Sunday) to 6 (Saturday).
   *
   * @property firstWeekDayOfMonth
   * @type number
   * @private
   */
  firstWeekDayOfMonth: computed('firstDateOfMonth', function() {
    return this.get('firstDateOfMonth').getDay();
  }),

  /**
   * Number of days in the month.
   *
   * @property daysInMonth
   * @type number
   * @private
   */
  daysInMonth: computed('year', 'month', function() {
    return new Date(this.get('year'), this.get('month'), 0).getDate();
  }),

  /**
   * If the month label should be in a single line or in the same line as the first week.
   *
   * @property monthLabelInSingleLine
   * @type bool
   * @private
   */
  monthLabelInSingleLine: computed('firstWeekDayOfMonth', function() {
    if (this.get('firstWeekDayOfMonth') < 2) {
      return true;
    } else {
      return false;
    }
  }),

  weeks: computed('year', 'month', 'monthLabelInSingleLine', function() {
    if (!this.get('year') || !this.get('month')) {
      return [];
    }

    let { year, month, firstWeekDayOfMonth, daysInMonth, monthLabelInSingleLine } =
        this.getProperties('year', 'month', 'firstWeekDayOfMonth', 'daysInMonth', 'monthLabelInSingleLine');

    let week = [];
    let weeks = [week];

    // Add blank cells in first week
    for (let i = 0; i < firstWeekDayOfMonth; ++i) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; ++day) {
      let date = new Date(year, month - 1, day);
      week.push({ day, date });

      if (date.getDay() === 6) {
        week = [];
        weeks.push(week);
      }
    }

    // Add blank cells at the end of the month
    while (week.length < 7) {
      week.push(null);
    }

    // Ensure all months have the same number of rows
    if (weeks.length === 5 && !monthLabelInSingleLine) {
      week = [];
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  }).readOnly(),

  actions: {
    onCellClicked(date) {
      if (!moment(date).isSame(this.get('selectedDate'))) {
        this.sendAction('onChange', date);
      }
    }
  }
});
