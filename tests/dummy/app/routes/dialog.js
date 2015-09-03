import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showAlert() {
      this.controller.set('isAlert',true);
    },
    showConfirm() {
      this.controller.set('isConfirm',true);
    },
    showCustom() {
      this.controller.set('isCustom',true);
    },
    closeAlert(){
      this.controller.set('isAlert',false);
    },
    closeConfirm() {
      this.controller.set('isConfirm',false);
    },
    closeCustom() {
      this.controller.set('isCustom',false);
    },
    handleDialog(){
      window.alert('Handling action');
    }
  }
});
