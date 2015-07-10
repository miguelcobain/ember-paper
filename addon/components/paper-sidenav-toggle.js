import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';

export default Ember.Component.extend({
  tagName: 'md-sidenav-toggle',
  classNames: ['paper-sidenav-toggle'],
  toggle: true,

  navContainer: Ember.computed(function () {
    return this.nearestOfType(PaperNavContainer);
  }),

  click() {
    var navContainer = this.get("navContainer");
    if (this.get('toggle')) {
      navContainer.toggleSidenav();
    } else {
      navContainer.expandSidenav();
    }
    return false;
  }
});
