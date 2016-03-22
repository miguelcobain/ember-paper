import Ember from 'ember';
const { computed } = Ember;
export default Ember.Component.extend({
  init(){
    this._super();
    this.get('wrapperWidth');
  },

  tagName: 'md-tabs-wrapper',

  self: Ember.computed(function(){
    return Ember.Object.create({
      id: this.elementId
    });
  }),

  tabWidths: computed.mapBy('parent.tabs', 'width'),
  wrapperWidth: computed.sum('tabWidths'),

  // inherited
  centerTabs: computed.reads('parent.centerTabs'),
  tabs: computed.reads('parent.tabs'),

  showInkBar: computed('parent.noInkBar', 'parent.tabs.[]', function(){
    var parent = this.get('parent');
    return (!parent.get('noInkBar') && parent.get('tabs.length')) ? true: false;
  }),

  inkBarLeft: computed('parent.selectedTab.left', 'self.offset', function(){
    var leftOffset = this.$().offset().left;
    debugger;
    return this.get('parent.selectedTab.left') - leftOffset;
  }),
  inkBarRight: Ember.computed('parent.selectedTab.right', 'wrapperWidth', 'self.offset', function() {
    debugger;
    return (this.get('parent.selectedTab.left') + this.get('parent.selectedTab.width')) - this.get('wrapperWidth');
  }),

  didInsertElement() {
    var self = this.get('self');
    self.set('height', this.$().outerHeight());
    self.set('offset', this.$().offset().left);
    this.get('parent').identifyTabsWrapper(self);
  },

});
