import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({

  classNameBindings: ['hideClass'],

  name: 'default',

  init() {
    this._super(...arguments);
    if (this.get('navContainer')) {
      let lockedOpen = this.get('navContainer').get('sideBar').get('lockedOpen');
      if (lockedOpen) {
        this.set('hideClass', `hide-${lockedOpen}`);
      }
    }
  },

  actions: {
    toggleMenu() {
      this.get('navContainer').get('sideBar').send('toggleMenu');
    }
  }

});
