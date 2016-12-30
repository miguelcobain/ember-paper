import Ember from 'ember';
import moment from 'moment';

const { Component, computed } = Ember;

/**
 * @class PaperCalendarMonth
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-calendar-month',
  months: [],

  /**
   * The date that is currently marked as selected in the calendar.
   *
   * @property selectedDate
   * @type Date
   * @public
   */
  selectedDate: null,

  /**
   * Minimun date that can be selected.
   *
   * @property minDate
   * @type Date
   * @todo Not implemented yet.
   */
  minDate: null,

  /**
   * Maximun date that can be selected.
   *
   * @property maxDate
   * @type Date
   * @todo Not implemented yet.
   */
  maxDate: null,

  /**
   * Called when the user clicks on a date in the calendar. You can use this
   * to change the `selectedDate`, if desired.
   *
   * @event onChange
   * @public
   */
  onChange: null,

  itemCount: 2000,

  currentMonthIndex: computed('itemCount', function() {
    return Math.ceil(this.get('itemCount') / 2);
  }).readOnly(),

  /**
   * Week days names to display in the calendar header.
   *
   * @property header
   * @type string[]
   * @public
   */
  header: null,

  actions: {
    getAtIndex(index) {
      let currentMonthIndex = this.get('currentMonthIndex');
      let monthAtIndex = moment().add(index - currentMonthIndex, 'month');

      return { year: monthAtIndex.year(), month: monthAtIndex.month() + 1 };
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get('header')) {
      this.set('header', ['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    }
  },

  didRender() {
    this._super(...arguments);
    this.hideVerticalScrollbar();
  },

  /**
   * Hides the browser-created vertical scrollbar.
   *
   * @method hideVerticalScrollbar
   * @private
   */
  hideVerticalScrollbar() {
    let header = this.$('.md-calendar-day-header').get(0);
    let scrollMask = this.$('.md-calendar-scroll-mask').get(0);
    let scroller = this.$('.md-virtual-repeat-scroller').get(0);

    let headerWidth = header.clientWidth;
    let scrollbarWidth = scroller.offsetWidth - scroller.clientWidth;
    let scrollerWidth = headerWidth + scrollbarWidth;

    scrollMask.style.width = `${headerWidth}px`;

    scroller.style.width = `${scrollerWidth}px`;
    scroller.style.paddingRight = `${scrollbarWidth}px`;
  }
});
