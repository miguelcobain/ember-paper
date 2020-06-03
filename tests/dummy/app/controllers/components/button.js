import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    raisedButton() {
      alert('You pressed a raised button.');
    },

    flatButton() {
      alert('You pressed a flat button.');
    },

    targetButton() {
      alert('You pressed a target button.');
    }
  }
});
