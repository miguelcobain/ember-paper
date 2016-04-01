import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({

  paperSidenav: inject.service('paper-sidenav'),

  /*didInsertElement() {
    this._super(...arguments);
    if (this.get('navContainer')) {
      let lockedOpen = this.get('navContainer').get('sideBar').get('locked-open');
      if (lockedOpen) {
        this.$().attr(`hide-${lockedOpen}`, true);
      }
    }
  },*/

  click: function() {
    this.send('toggleMenu');
  },

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle(this.get('target'));
    }
  }
});
