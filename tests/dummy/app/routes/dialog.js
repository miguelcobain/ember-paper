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
    showSimple() {
      this.controller.set('isSimple',true);
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
    closeSimple() {
      this.controller.set('isSimple',false);
    },
    handleDialog(){
      window.alert('Handling action');
    }
  }
});
