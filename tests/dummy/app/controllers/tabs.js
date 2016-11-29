import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    leaveTab() {
      alert('onDeselect handler happens here!');
    },
    enterTab() {
      alert('onSelect handler happens here!');
    }
  }
});
