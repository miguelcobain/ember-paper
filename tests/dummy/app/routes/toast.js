import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveSomething: function () {
      this.send('openGlobalToast', 'Hello You..');
    }
  }
});
