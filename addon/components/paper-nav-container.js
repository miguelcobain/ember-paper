import Ember from 'ember';
import FlexMixin from '../mixins/flex-mixin';

export default Ember.Component.extend(FlexMixin, {
  tagName: 'md-nav-container',
  classNames:['paper-nav-container'],
  classNameBindings: ['active:sidenav-expanded'],

  active: false,

  // Custom events

  toggleSidenav: function(){
    this.toggleProperty('active');
  },

  expandSidenav: function(){
    this.set('active', true);
  },

  collapseSidenav: function(){
    this.set('active', false);
  }
});
