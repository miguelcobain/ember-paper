import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    /*Custom dialog*/
    openDialog(param, event) {
      this.set('dialogParent', Ember.$('#popupContainer'));
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

    /*Alert dialog*/
    openAlertDialog(param, event) {
      this.set('dialogParent', Ember.$('#popupContainer'));
      this.set('basicDialogOrigin',  Ember.$(event.currentTarget));
      this.set('alertDialogIsOpen', true);
    },
    closeAlertDialog() {
      this.set('alertDialogIsOpen', false);
      this.set('yourAnswer', "you got it!");
    },

    /*Confirm dialog*/
    openConfirmDialog(param, event) {
      this.set('dialogParent', Ember.$('#popupContainer'));
      this.set('confirmDialogOrigin',  Ember.$(event.currentTarget));
      this.set('confirmDialogIsOpen', true);
    },
    confirmClearDept() {
      this.set('confirmDialogIsOpen', false);
      this.set('yourAnswer', "You have no dept :)");
    },
    cancelClearDept() {
      this.set('confirmDialogIsOpen', false);
      this.set('yourAnswer', "Yup, clearing your dept was a scam :(");
    }

  }
});
