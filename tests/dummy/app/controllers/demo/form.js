import Ember from 'ember';
const { Controller, run } = Ember;

export default Controller.extend({
  actions: {
    mySubmitAction(e) {
      this.set('basicUsageSuccess', true);
      run.later(this, () => {
        this.set('basicUsageSuccess', false);
      }, 4000);
    }
  }
});
