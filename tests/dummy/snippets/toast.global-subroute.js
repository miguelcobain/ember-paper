import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveNews () {
      // do something and show toast:
      this.send('openToast', 'Hello World!');
    }
  }
});
