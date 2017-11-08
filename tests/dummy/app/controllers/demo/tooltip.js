import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  position: 'bottom',

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});