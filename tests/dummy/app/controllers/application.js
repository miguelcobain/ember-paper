import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    toggleDemosExpanded() {
      this.toggleProperty('demosExpanded');
    }
  },

  demosExpanded: true
});
