import Ember from 'ember';

export default Ember.Controller.extend({
  isEditingText: null,

  actions: {
    notifyEditingText: function(/* value */) {
      this.set('isEditingText', true);
    },
    alertFocusedOut: function(value) {
      this.set('isEditingText', false);
      alert('Focused out. Value: ' + value);
    }
  }
});
