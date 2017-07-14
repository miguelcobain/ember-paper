import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  hideDelay: 3000,
  positionX: 'left',
  positionY: 'bottom',
  actions: {
    /* Toast */
    openToast() {
      this.set('showToast', true);
    },
    openToastWithout() {
      this.set('showToastWithout', true);
    },
    closeToast() {
      this.set('showToast', false);
    },
    closeToastWithout() {
      this.set('showToastWithout', false);
    },
    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    },
    buttonAction() {
      alert('You have pressed the button!');
    }
  }
});
