import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  init() {
    this._super();
  },

  tagName: 'md-tabs-wrapper',

  self: computed(function() {
    return Ember.Object.create({
      id: this.elementId
    });
  }),

  /* Inherited from {{paper-tabs}} */
  centerTabs: computed.reads('parent.centerTabs'),
  tabs: computed.reads('parent.tabs'),
  noInkBar: computed.reads('parent.noInkBar'),
  selected: computed.reads('parent.selected'),
  lastSelectedIndex: computed.reads('parent.lastSelectedIndex'),
  selectedTab: computed.reads('parent.selectedTab'),
  canvasWidth: computed.reads('parent.canvasWidth'),
  pagingWidth: computed.reads('parent.pagingWidth'),
  shouldPaginate: computed.reads('parent.shouldPaginate'),
  canPageBack: computed.reads('parent.canPageBack'),
  canPageForward: computed.reads('parent.canPageForward'),
  offsetLeft: computed.reads('parent.offsetLeft'),
  shouldCenterTabs: computed.reads('parent.shouldCenterTabs'),

  didInsertElement() {
    let self = this.get('self');
    self.set('height', this.$().outerHeight());
    self.set('offset', this.$().offset().left);
    this.get('parent').identifyTabsWrapper(self);
  }
});
