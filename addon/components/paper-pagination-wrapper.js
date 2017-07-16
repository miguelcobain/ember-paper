/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';
import layout from '../templates/components/paper-pagination-wrapper';

/**
 * @class PaperPaginationWrapper
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-pagination-wrapper',

  layout,

  classNameBindings: [
    'shouldCenterTabs:md-center-tabs'
  ],

  attributeBindings: [
    'styleAttr:style'
  ],

  /* Inherited from {{paper-tabs}} */
  tabs: computed.readOnly('parentComponent.tabs'),
  noInkBar: computed.readOnly('parentComponent.noInkBar'),
  lastSelectedIndex: computed.readOnly('parentComponent.lastSelectedIndex'),
  selected: computed.readOnly('parentComponent.selected'),
  selectedTab: computed.readOnly('parentComponent.selectedTab'),
  canvasWidth: computed.readOnly('parentComponent.canvasWidth'),
  pagingWidth: computed.readOnly('parentComponent.pagingWidth'),
  offsetLeft: computed.readOnly('parentComponent.offsetLeft'),
  shouldCenterTabs: computed.readOnly('parentComponent.shouldCenterTabs'),
  shouldStretchTabs: computed.readOnly('parentComponent.shouldStretchTabs'),
  shouldPaginate: computed.readOnly('parentComponent.shouldPaginate'),
  selectedTabOffsetLeft: computed.readOnly('parentComponent.selectedTabOffsetLeft'),
  selectedTabWidth: computed.readOnly('parentComponent.selectedTabWidth'),

  noTabSelected: computed.empty('selectedTab'),

  hideInkBar: computed.or('noTabSelected', 'noInkBar'),

  styleAttr: computed('shouldPaginate', 'offsetLeft', function() {
    if (this.get('shouldPaginate')) {
      return htmlSafe(`transform: translate3d(-${this.get('offsetLeft')}px, 0px, 0px);`);
    }
  }),

  wrapperWidth: computed('shouldStretchTabs', 'shouldCenterTabs', 'canvasWidth', 'pagingWidth', function() {
    if (this.get('shouldCenterTabs') || this.get('shouldStretchTabs')) {
      return this.get('canvasWidth');
    }
    return this.get('pagingWidth');
  }),

  inkBarDirection: computed('lastSelectedIndex', 'selected', function() {
    return (this.get('lastSelectedIndex') > this.get('selected')) ? 'left' : 'right';
  }),

  inkBarLeftPosition: computed.readOnly('selectedTabOffsetLeft'),

  inkBarRightPosition: computed('wrapperWidth', 'inkBarLeftPosition', 'selectedTabWidth', function() {
    return this.get('wrapperWidth') - this.get('inkBarLeftPosition') - this.get('selectedTabWidth');
  })
});
