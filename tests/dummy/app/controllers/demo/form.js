import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    basicSubmitAction() {
      this.set('firstName', '');
      this.set('middleInitial', '');
      this.set('lastName', '');
      this.set('age', '');
    },
    disabledSubmitAction() {
      this.set('favoriteLetter', '');
    },
    customSubmitAction() {
      this.set('favoriteNumber', '');
    }
  }
});
