import Ember from 'ember';

const {
  computed,
  Controller,
  RSVP,
  run,
  A: emberArray } = Ember;

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default Controller.extend({

  yearScrollIndex: 0,
  deferredItems: [],
  infiniteItems: emberArray([]),
  loadedPages: {},
  PAGE_SIZE: 50,
  scrollIndex: 0,
  yearIndex: 0,
  length: 50000,
  selectedYear: 2016,

  items: computed(function() {
    let arr = [];
    for (let i = 0; i < 1000; i++) {
      arr.push(i);
    }
    return emberArray(arr);
  }),

  years: computed(function() {
    let currentYear = new Date().getFullYear();
    let endYear = currentYear + 20;
    return Array.from({ length: (endYear - currentYear) }, (v, k) => k + currentYear);
  }).readOnly(),

  monthsWithYears: computed('years', function() {
    let results = [];
    this.get('years').forEach((year) => {
      results.push({ year, text: year, header: true });
      let monthsInYear = new Array(12).map((_, i) => {
        return { year, month: i, text: months[i] };
      });
      results.push(...monthsInYear);
    });
    return results;
  }).readOnly(),

  actions: {

    fetchMore() {
      let infiniteItems = this.get('infiniteItems');
      let nextSet = [];
      let length = infiniteItems.get('length');
      for (let i = length; i < length + 50; i++) {
        nextSet.push(i);
      }

      infiniteItems.pushObjects(nextSet);
    },

    scrollTo(chosenYear) {
      this.set('selectedYear', chosenYear);
      this.set('yearScrollIndex', this.get('years').indexOf(chosenYear) * 13);
    },

    getAtIndex(index) {
      let pageNumber = Math.floor(index / this.PAGE_SIZE);
      let page = this.loadedPages[pageNumber];

      if (page) {
        return new RSVP.Promise((resolve) => resolve(page[index % this.PAGE_SIZE]));
      } else if (page !== null) {
        return this.fetchPage(pageNumber, index);
      } else {
        return new RSVP.Promise((resolve) => {
          run.later(this, function() {
            let pageOffset = pageNumber * this.PAGE_SIZE;
            resolve(this.loadedPages[pageNumber][index - pageOffset]);
          }, 300);
        });
      }
    }
  },

  fetchPage(pageNumber, index) {
    this.loadedPages[pageNumber] = null;
    return new RSVP.Promise((resolve) => {
      run.later(this, function() {
        this.loadedPages[pageNumber] = [];
        let pageOffset = pageNumber * this.PAGE_SIZE;
        for (let i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
          this.loadedPages[pageNumber].push(i);
        }
        resolve(this.loadedPages[pageNumber][index - pageOffset]);
      }, 300);
    });
  }
});
