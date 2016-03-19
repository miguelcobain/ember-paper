import Ember from 'ember';

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

  tabWidths: Ember.computed.mapBy('parent.tabs', 'width'),
  wrapperWidth: Ember.computed.sum('tabWidths'),


  showInkBar: Ember.computed('parent.noInkBar', 'parent.tabs.[]', function(){
    var parent = this.get('parent');
    return (!parent.get('noInkBar') && parent.get('tabs.length')) ? true: false;
  }),

  inkBarLeft: Ember.computed.reads('parent.selectedTab.left'),
  inkBarRight: Ember.computed('parent.selectedTab.right', 'wrapperWidth', function() {
    return this.get('parent.selectedTab.right');
  }),

  didInsertElement() {
    var self = this.get('self');
    self.set('height', this.$().outerHeight());
    this.get('parent').identifyTabsWrapper(self);
  },

});
