import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    }
  }
});