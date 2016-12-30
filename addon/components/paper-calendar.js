import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperCalendar
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-calendar',

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
  onChange: null
});
