import Ember from 'ember';
const { Controller, run } = Ember;

export default Controller.extend({	
  actions: {
    basicSubmitAction() {
      // resetting our form's state
      this.set('firstName', '');
      this.set('middleInitial', '');
      this.set('lastName', '');
      this.set('age', '');
    },
    disabledSubmitAction() {
	  // resetting our form's state
      this.set('favoriteLetter', '');
    },
    customSubmitAction() {
      // resetting our form's state
      this.set('favoriteNumber', '');
    }
  }
});
