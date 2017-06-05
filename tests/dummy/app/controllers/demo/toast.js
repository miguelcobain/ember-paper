import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  left: false,
  right: true,
  top: true,
  bottom: false,

  actions: {
    openCustom() {
      this.set('isOpenCustom', true);
    },

    closeCustom() {
      this.set('isOpenCustom', false);
    },

    openDelayed() {
      this.set('isOpenDelayed', true);
    },

    closeDelayed() {
      this.set('isOpenDelayed', false);
    },

    openBasic() {
      this.set('basicMessage', 'Hello World!');
      this.set('isOpenBasic', true);
    },

    closeBasic() {
      this.set('isOpenBasic', false);
    },

    openFabBottom() {
      this.set('isFabBottom', true);
    },

    closeFabBottom() {
      this.set('isFabBottom', false);
    },

    alertSomething() {
      alert('Clicked action');
    },

    saveSomething() {
      this.send('openGlobalToast', 'Hello You..');
    },

    toggleBottom(newValue) {
      if (newValue) {
        this.set('top', false);
      }

      this.set('bottom', newValue);
    },

    toggleTop(newValue) {
      if (newValue) {
        this.set('bottom', false);
      }

      this.set('top', newValue);
    },

    toggleLeft(newValue) {
      if (newValue) {
        this.set('right', false);
      }

      this.set('left', newValue);
    },

    toggleRight(newValue) {
      if (newValue) {
        this.set('left', false);
      }

      this.set('right', newValue);
    }
  }
});
