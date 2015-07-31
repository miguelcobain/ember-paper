import Ember from 'ember';

export default Ember.Route.extend({
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
