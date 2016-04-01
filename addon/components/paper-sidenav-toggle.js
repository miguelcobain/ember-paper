import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({

  paperSidenav: inject.service('paper-sidenav'),

  click() {
    this.send('toggleMenu');
  },

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle(this.get('target'));
    }
  }
});
