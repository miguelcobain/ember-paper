import Ember from 'ember';
const { Controller, String: { camelize } } = Ember;

export default Controller.extend({

  paginatedTabs: Array.from(new Array(10).keys())
    .map((id) => `Tab ${id}`),

  actions: {
    toggleSourceCode(name) {
      this.toggleProperty(camelize(`show-${name}`));
    }
  }
});