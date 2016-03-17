import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-tabs',
  classNames: ["md-primary"],
  classNameBindings: ['dynamicHeight:md-dynamic-height'],
  activeTab: Ember.computed.alias('tabs.firstObject'),
  tabs: Ember.computed(function(){
    return Ember.A();
  }),
  activeTabIndex: Ember.computed('activeTab', 'tabs.[]', function() {
    if (this.get('tabs')) {
      return this.get('tabs').indexOf(this.get('activeTab'));
    }
  }),

  actions: {
    setWormhole(id) {
      this.set('wormhole', id);
    },
    createTab(id) {
      this.get('tabs').pushObject(id);
    },
    destroyTab(id) {
      this.get('tabs').removeObject(id);
    },
    selectTab(id) {
      this.set('activeTab', id);
    },
    addTab() {
      this.get('tabs').pushObject(this.get('tabs.length')+1);
    }
  }
});
