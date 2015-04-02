import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';

export default Ember.Component.extend({
  tagName: 'md-sidenav-toggle',
  classNames: ['paper-sidenav-toggle'],
  toggle: true,

  navContainer: Ember.computed(function() {
    return this.nearestOfType(PaperNavContainer);
  }),

  click: function() {
    if (this.get('toggle')) {
      this.get('navContainer').toggleSidenav();
    } else {
      this.get('navContainer').expandSidenav();
    }
    return false;
  }
});
