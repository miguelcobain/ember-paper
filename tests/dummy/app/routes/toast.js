import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  actions: {
    saveSomething() {
      this.send('openGlobalToast', 'Hello You..');
    }
  }
});
