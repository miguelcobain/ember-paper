import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    openToast: function () {
      this.set('myToastOpen', true);
    },
    closeToast: function () {
      this.set('myToastOpen', false);
    },
    openToastDelayed: function () {
      this.set('isDelayedToastOpen', true);
    },
    closeToastDelayed: function () {
      this.set('isDelayedToastOpen', false);
    },
    openToastLeftBottom: function () {
      this.set('leftBottomMessage', 'Hello World!');
      this.set('leftBottom', true);
    },
    closeToastLeftBottom: function () {
      this.set('leftBottom', false);
    }
  }
});
