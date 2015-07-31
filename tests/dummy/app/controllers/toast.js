import Ember from 'ember';

export default Ember.Controller.extend({

  left: false,
  right: true,
  top: true,
  bottom: false,


  actions: {
    openCustom: function () {
      this.set('isOpenCustom', true);
    },
    closeCustom: function () {
      this.set('isOpenCustom', false);
    },
    openDelayed: function () {
      this.set('isOpenDelayed', true);
    },
    closeDelayed: function () {
      this.set('isOpenDelayed', false);
    },
    openBasic: function () {
      this.set('basicMessage', 'Hello World!');
      this.set('isOpenBasic', true);
    },
    closeBasic: function () {
      this.set('isOpenBasic', false);
    },
    openFabBottom: function () {
      this.set('isFabBottom', true);
    },
    closeFabBottom: function () {
      this.set('isFabBottom', false);
    },
    alertSomething: function () {
      alert("Clicked action");
    }
  }
});
