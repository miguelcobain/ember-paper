import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    /*Custom dialog*/
    openDialog(param, event) {
      this.set('dialogOrigin',  Ember.$(event.currentTarget));
      this.set('dialogIsOpen', true);
    },
    closeDialog() {
      this.set('dialogIsOpen', false);
    },
    answer(param) {
      this.set('yourAnswer', param);
      this.set('dialogIsOpen', false);
    },

    /*Basic dialog*/
    openBasicDialog(param, event) {
      this.set('basicDialogOrigin',  Ember.$(event.currentTarget));
      this.set('basicDialogIsOpen', true);
    },
    closeBasicDialog() {
      this.set('basicDialogIsOpen', false);
    }
  },

  dialogParent: Ember.computed(function () {
    return Ember.$('#popupContainer');
  })
});
