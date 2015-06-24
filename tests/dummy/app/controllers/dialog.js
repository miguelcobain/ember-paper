import Ember from 'ember';

export default Ember.Controller.extend({
  showDialog: false,

  actions: {
    showDialog() {
      this.toggleProperty('showDialog');
    }
  }
});
