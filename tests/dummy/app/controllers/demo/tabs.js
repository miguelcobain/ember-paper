import Ember from 'ember';
const { Controller, String: { camelize } } = Ember;

export default Controller.extend({
  actions: {
    toggleSourceCode(name) {
      this.toggleProperty(camelize(`show-${name}`));
    }
  }
});