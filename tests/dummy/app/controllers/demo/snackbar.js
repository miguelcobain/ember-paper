import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  hideDelay: 3000,
  actions: {
    /* Snackbar */
    openSnackbar() {
      this.set('showSnackbar', true);
    },
    openSnackbarWithout() {
      this.set('showSnackbarWithout', true);
    },
    closeSnackbar() {
      this.set('showSnackbar', false);
    },
    closeSnackbarWithout() {
      this.set('showSnackbarWithout', false);
    },
    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    },
    buttonAction() {
      alert('You have pressed the button!');
    }
  }
});
