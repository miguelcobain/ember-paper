import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['paper-calendar-years'],

  years: computed('minDate', 'maxDate', 'center', function() {
    let { minDate, maxDate, center } = this.getProperties('minDate', 'maxDate', 'center');
    let minYear = minDate ? minDate.getFullYear() : center.getFullYear() - 100;
    let maxYear = maxDate ? maxDate.getFullYear() : center.getFullYear() + 100;

    let years = [];
    for (let year = minYear; year <= maxYear; ++year) {
      years.push(year);
    }

    return years;
  }),

  actions: {
    onSelect() {},
    onFocusYear() {},
    onBlurYear() {}
  }
});
