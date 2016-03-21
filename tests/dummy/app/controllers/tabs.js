import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    leaveTab() {
      alert("onDeselect handler happens here!");
    },
    enterTab() {
      alert("onSelect handler happens here!");
    }
  }
});
