import Ember from 'ember';
import FlexMixin from '../mixins/flex-mixin';

export default Ember.Component.extend(FlexMixin, {

  paperEventBus: Ember.inject.service('paper-eventbus'),

  tagName: 'md-nav-container',
  classNames: ['paper-nav-container'],
  classNameBindings: ['open:sidenav-expanded'],

  open: false,

  _initialize: Ember.on('init', function(){
    var eventBus = this.get("paperEventBus");
    eventBus.subscribe('paper:toggle-sidenav', this, 'toggleSidenav');
    eventBus.subscribe('paper:expand-sidenav', this, 'expandSidenav');
  }),
  _tearDown: Ember.on('willDestroyElement', function(){
    var eventBus = this.get("paperEventBus");
    eventBus.unsubscribe('toggleSidenav');
    eventBus.unsubscribe('expandSidenav');
  }),

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
