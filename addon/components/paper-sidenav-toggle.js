import Ember from 'ember';
const { Component, inject } = Ember;

export default Component.extend({

  name: 'default',

  paperSidenav: inject.service(),

  click() {
    this.get('paperSidenav').toggle(this.get('name'));
  },

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle(this.get('name'));
    }
  }

});
