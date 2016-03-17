import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tabs: computed.readOnly('parent.tabs'),
  activeTab: computed.readOnly('parent.activeTab'),
  wormhole: computed.readOnly('parent.wormhole'),
  position: computed.readOnly('parent.position'),
  activeTabIndex: computed.readOnly('parent.activeTabIndex'),
  tabIndex: computed.readOnly('parent.tabIndex'),
  isActive: computed.readOnly('parent.isActive'),

  isLeft: Ember.computed('isActive', 'tabIndex', 'activeTabIndex', function() {
    if (this.get('isActive')) {
      return false;
    }
    if (this.get('tabIndex') < this.get('activeTabIndex')) {
      return true;
    }
  }),
  isRight: Ember.computed('isActive', 'tabIndex', 'activeTabIndex', function() {
    if (this.get('isActive')) {
      return false;
    }
    if (this.get('tabIndex') > this.get('activeTabIndex')) {
      return true;
    }
  })
});
