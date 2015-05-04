import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-menu-container',
  classNames: ['paper-menu-container'],

  isOpen: false,
  actions: {
    toggleMenu: function() {
      this.toggleProperty('isOpen');
    }
  }
});
