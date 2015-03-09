import Ember from 'ember';

export default Ember.Component.extend({
  //TODO change to `md-menu-container` after styles are added
  tagName: 'div',
  classNames: ['paper-menu-container'],

  isOpen: false,
  actions: {
    toggleMenu: function() {
      this.toggleProperty('isOpen');
    }
  }
});
