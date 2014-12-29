import Ember from 'ember';

export default Ember.View.extend({
  actions: {
    targetButton: function() {
      alert('You pressed a target button. -from view');
    }
  }
});
