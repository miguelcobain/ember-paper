import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  selectedNavItem: 1,

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});
