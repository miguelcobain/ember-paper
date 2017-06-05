import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    openToast: function(msg) {
      this.controller.set('rightLeftToastMessage', msg);
      this.controller.set('isOpenMessage', true);
    },

    closeToast: function() {
      this.controller.set('isOpenMessage', false);
    }
  }
});
