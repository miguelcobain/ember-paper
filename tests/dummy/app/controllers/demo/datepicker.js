import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  selectedDate: computed(function() {
    return new Date();
  }),

  closeOnSelect: false
});
