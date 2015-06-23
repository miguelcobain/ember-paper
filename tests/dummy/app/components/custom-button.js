import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    targetButton: function() {
      alert('You pressed a target button. -from component');
    }
  }
});
