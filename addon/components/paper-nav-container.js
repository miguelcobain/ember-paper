import Ember from 'ember';

export default Ember.Component.extend({
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
