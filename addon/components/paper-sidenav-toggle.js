import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';

export default Ember.Component.extend({
  tagName: 'div',

  navContainer: Ember.computed(function() {
    return this.nearestOfType(PaperNavContainer);
  }),

  actions: {
    toggleMenu() {
      this.get('navContainer').get('sideBar').send('toggleMenu');
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('navContainer')) {
      let lockedOpen = this.get('navContainer').get('sideBar').get('locked-open');
      if (lockedOpen) {
        this.$().attr(`hide-${lockedOpen}`, true);
      }
    }
  }

});
