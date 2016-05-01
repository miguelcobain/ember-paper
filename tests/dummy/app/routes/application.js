import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  actions: {
    willTransition() {
      this.controller.set('drawerOpen', false);
    },

    alertValue(value) {
      alert(`You clicked Radio button: ${value}`);
    },

    openGlobalToast(msg) {
      this.controller.set('globalToastMessage', msg);
      this.controller.set('isOpenGlobalToast', true);
    },

    closeGlobalToast() {
      this.controller.set('isOpenGlobalToast', false);
    }
  }
});
