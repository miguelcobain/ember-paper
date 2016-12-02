import Ember from 'ember';
const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: 'md-pagination-wrapper',

  /* Inherited from {{paper-tabs-wrapper}} */
  tabs: computed.reads('parent.tabs'),
  centerTabs: computed.reads('parent.centerTabs'),
  selected: computed.reads('parent.selected'),
  lastSelectedIndex: computed.reads('parent.lastSelectedIndex'),
  selectedTab: computed.reads('parent.selectedTab'),
  noInkBar: computed.reads('parent.noInkBar'),
  canvasWidth: computed.reads('parent.canvasWidth'),
  pagingWidth: computed.reads('parent.pagingWidth'),
  offsetLeft: computed.reads('parent.offsetLeft'),
  shouldCenterTabs: computed.reads('parent.shouldCenterTabs'),
  shouldStretchTabs: computed.reads('parent.shouldStretchTabs'),
  showInkBar: computed('noInkBar', 'tabs.[]', function() {
    if (!this.get('noInkBar') && (this.get('tabs.length') > 0)) {
      return true;
    }
    return false;
  }),

  inkBarDirection: computed('lastSelectedIndex', 'selected', function() {
    return (this.get('lastSelectedIndex') > this.get('selected')) ? 'left' : 'right';
  }),

  classNameBindings: ['centerTabs:md-center-tabs'],
  attributeBindings: ['styleAttr:style'],
  styleAttr: computed('widthStyle', 'offsetStyle', function() {
    return htmlSafe(`${this.get('widthStyle')}${this.get('offsetStyle')}`);
  }),

  /* Style Bindings */
  widthStyle: computed('pagingWidth', function() {
    if (this.get('shouldStretchTabs')) {
      return '';
    } else {
      let width = this.get('pagingWidth');
      return (width) ? `width: ${width}px;` : 'width: 0px';
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
    let leftOffset = this.get('offsetLeft');
    return this.get('selectedTab.offsetLeft') - leftOffset;
  }),
  inkBarRightPosition: computed('inkBarLeftPosition', 'selectedTab.offsetWidth', 'pagingWidth', 'offsetLeft', function() {
    let position = this.get('pagingWidth');// - this.get('selectedTab.left');
    position -= this.get('inkBarLeftPosition');
    position -= this.get('selectedTab.offsetWidth');
    return position;
  })
});
