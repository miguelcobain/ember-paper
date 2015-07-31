import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    transitionTo(route) {
      this.transitionTo(route);
    },
    raisedButton() {
      alert('You pressed a raised button.');
    },
    flatButton() {
      alert('You pressed a flat button.');
    },
    targetButton() {
      alert('You pressed a target button. -from route');
    },
    willTransition() {
      this.controller.set('drawerOpen', false);
    },
    alertValue(value) {
      alert('You clicked Radio button: ' + value);
    },
    openGlobalToast: function (msg) {
      this.controller.set('globalToastMessage', msg);
      this.controller.set('isOpenGlobalToast', true);
    },
    closeGlobalToast: function () {
      this.controller.set('isOpenGlobalToast', false);
    },
  }
});
