import Ember from 'ember';
const { computed, computed: { reads, empty, or }, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: 'md-pagination-wrapper',

  classNameBindings: [
    'centerTabs:md-center-tabs'
  ],

  attributeBindings: [
    'styleAttr:style'
  ],

  /* Inherited from {{paper-tabs-wrapper}} */
  tabs: reads('parent.tabs'),
  noInkBar: reads('parent.noInkBar'),
  lastSelectedIndex: reads('parent.lastSelectedIndex'),
  centerTabs: reads('parent.centerTabs'),
  selected: reads('parent.selected'),
  selectedTab: reads('parent.selectedTab'),
  canvasWidth: reads('parent.canvasWidth'),
  pagingWidth: reads('parent.pagingWidth'),
  offsetLeft: reads('parent.offsetLeft'),
  shouldCenterTabs: reads('parent.shouldCenterTabs'),
  shouldStretchTabs: reads('parent.shouldStretchTabs'),

  isEmpty: empty('tabs'),

  hideInkBar: or('isEmpty', 'noInkBar'),

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
