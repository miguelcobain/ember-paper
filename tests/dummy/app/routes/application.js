import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition() {
      this.controller.set('drawerOpen', false);
    },
    alertValue(value) {
      alert(`You clicked Radio button: ${value}`);
    }
  }
});
