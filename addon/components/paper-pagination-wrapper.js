import Ember from 'ember';
const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: 'md-pagination-wrapper',

  classNameBindings: [
    'centerTabs:md-center-tabs'
  ],

  attributeBindings: [
    'styleAttr:style'
  ],

  /* Inherited from {{paper-tabs-wrapper}} */
  tabs: computed.reads('parent.tabs'),
  noInkBar: computed.reads('parent.noInkBar'),
  lastSelectedIndex: computed.reads('parent.lastSelectedIndex'),
  centerTabs: computed.reads('parent.centerTabs'),
  selected: computed.reads('parent.selected'),
  selectedTab: computed.reads('parent.selectedTab'),
  canvasWidth: computed.reads('parent.canvasWidth'),
  pagingWidth: computed.reads('parent.pagingWidth'),
  offsetLeft: computed.reads('parent.offsetLeft'),
  shouldCenterTabs: computed.reads('parent.shouldCenterTabs'),
  shouldStretchTabs: computed.reads('parent.shouldStretchTabs'),

  isEmpty: computed.empty('tabs'),

  hideInkBar: computed.or('isEmpty', 'noInkBar'),

  inkBarDirection: computed('lastSelectedIndex', 'selected', function() {
    return (this.get('lastSelectedIndex') > this.get('selected')) ? 'left' : 'right';
  }),

  styleAttr: computed('widthStyle', 'offsetStyle', function() {
    return htmlSafe(`${this.get('widthStyle')}${this.get('offsetStyle')}`);
  }),

  /* Style Bindings */
  widthStyle: computed('pagingWidth', 'shouldStretchTabs', function() {
    if (this.get('shouldStretchTabs')) {
      return '';
    } else {
      const width = this.get('pagingWidth') || 0;
      return `width: ${width}px;`;
    }
  }),

  offsetStyle: computed('offsetLeft', 'shouldCenterTabs', function() {
    if (this.get('shouldCenterTabs')) {
      return '';
    } else {
      return `transform: translate3d(-${this.get('offsetLeft')}px, 0px, 0px);`;
    }
  }),

  inkBarLeftPosition: computed('selectedTab.offsetLeft', 'offsetLeft', function() {
    return this.get('selectedTab.offsetLeft') - this.get('offsetLeft');
  }),

  inkBarRightPosition: computed('pagingWidth', 'inkBarLeftPosition', 'selectedTab.offsetWidth', function() {
    return this.get('pagingWidth') - this.get('inkBarLeftPosition') - this.get('selectedTab.offsetWidth');
  })
});
