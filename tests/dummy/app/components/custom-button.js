import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    targetButton() {
      alert('You pressed a target button. -from component');
    }
  }
});
