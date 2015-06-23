import Ember from 'ember';
import FlexMixin from '../mixins/flex-mixin';

export default Ember.Component.extend(FlexMixin, {
  tagName: 'md-nav-container',
  classNames: ['paper-nav-container'],
  classNameBindings: ['open:sidenav-expanded'],

  open: false,

  // Custom events
  toggleSidenav() {
    this.toggleProperty('open');
  },

  expandSidenav() {
    this.set('open', true);
  },

  collapseSidenav() {
    this.set('open', false);
  }
});
