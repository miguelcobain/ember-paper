import Ember from 'ember';

export default Ember.Component.extend({
  tabsBinding: 'parent.tabs',
  activeTabBinding: 'parent.activeTab',
  wormholeBinding: 'parent.wormhole',
  positionBinding: 'parent.position',
  activeTabIndexBinding: 'parent.activeTabIndex',
  tabIndexBinding: 'parent.tabIndex',
  isActiveBinding: 'parent.isActive',

  isLeft: Ember.computed('isActive', 'tabIndex', 'activeTabIndex', function(){
    if (this.get('isActive')) { return false; }
    if (this.get('tabIndex') < this.get('activeTabIndex')) {
      return true;
    }
  }),
  isRight: Ember.computed('isActive', 'tabIndex', 'activeTabIndex', function(){
    if (this.get('isActive')) { return false; }
    if (this.get('tabIndex') > this.get('activeTabIndex')) {
      return true;
    }
  })
});
