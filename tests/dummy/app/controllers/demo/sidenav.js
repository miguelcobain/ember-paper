import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});