import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    willTransition() {
      this.controller.set('drawerOpen', false);
    },
    alertValue(value) {
      alert(`You clicked Radio button: ${value}`);
    }
  }
});
