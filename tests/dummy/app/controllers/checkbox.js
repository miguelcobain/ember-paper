import Ember from 'ember';

export default Ember.Controller.extend({
  value1: true,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: false,

  actions: {
    toggleValue6() {
      this.toggleProperty('value6');
    }
  }
});
