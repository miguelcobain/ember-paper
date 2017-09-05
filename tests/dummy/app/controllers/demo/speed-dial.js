import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  animation: 'fling',
  direction: 'down',

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});