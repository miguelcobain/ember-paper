import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({

  classNameBindings: ['hideClass'],

  name: 'default',

  paperSidenav: inject.service(),

  init() {
    this._super(...arguments);
    if (this.get('navContainer')) {
      let lockedOpen = this.get('navContainer').get('sideBar').get('lockedOpen');
      if (lockedOpen) {
        this.set('hideClass', `hide-${lockedOpen}`);
      }
    }
  },

  click() {
    this.get('paperSidenav').toggle(this.get('name'));
  },

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle(this.get('name'));
    }
  }

});
