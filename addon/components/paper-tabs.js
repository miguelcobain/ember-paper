/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import run from 'ember-runloop';
import injectService from 'ember-service/inject';
import observer from 'ember-metal/observer';
import { A } from 'ember-array/utils';
import { htmlSafe } from 'ember-string';
import layout from '../templates/components/paper-tabs';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import { ParentMixin } from 'ember-composability-tools';
import $ from 'jquery';

const offsetRight = ($dom) => $dom.prop('offsetLeft') + $dom.prop('clientWidth');

/**
 * @class PaperTabs
 * @extends Component
 * @uses ColorMixin
 * @uses ParentMixin
 */
export default Component.extend(ColorMixin, ParentMixin, {

  tagName: 'md-tabs',

  layout,

  constants: injectService(),

  /* Settings */
  dynamicHeight: false,
  alignTabs: 'top',
  noInk: false,
  noInkBar: false,
  centerTabs: false,
  stretchTabs: 'auto',
  autoSelect: false,
  borderBottom: false,

  classNameBindings: [
    'dynamicHeight:md-dynamic-height'
  ],

  attributeBindings: [
    'alignTabsAttr:md-align-tabs',
    'borderBottomAttr:md-border-bottom',
    'styleAttr:style'
  ],

  alignTabsAttr: computed('alignTabs', function() {
    return htmlSafe(this.get('alignTabs'));
  }),

  borderBottomAttr: computed('borderBottom', function() {
    return this.get('borderBottom') ? 'md-border-bottom' : null;
  }),

  styleAttr: computed('heightStyle', 'transitionStyle', function() {
    return htmlSafe(`${this.get('transitionStyle')} ${this.get('heightStyle')}`);
  }),

  // FIXME this is a workaround, tabs should not have a height and use ember-css-transitions instead
  transitionStyle: 'transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);',

  heightStyle: computed('dynamicHeight', 'height', function() {
    if (this.get('dynamicHeight') && this.get('height')) {
      return `height: ${this.get('height')}px`;
    }
    return '';
  }),

  shouldStretchTabs: computed('stretchTabs', 'isMobile', 'shouldPaginate', function() {
    switch (this.get('stretchTabs')) {
      case 'always':
        return true;
      case 'auto':
        return this.get('isMobile') && !this.get('shouldPaginate');
      case 'never':
      default:
        return false;
    }
  }),

  shouldPaginate: computed('canvasWidth', 'pagingWidth', function() {
    return this.get('pagingWidth') > this.get('canvasWidth');
  }),

  shouldCenterTabs: computed('centerTabs', 'shouldPaginate', function() {
    return this.get('centerTabs') && !this.get('shouldPaginate');
  }),

  canPageBack: computed.gt('offsetLeft', 0),

  canPageForward: computed('offsetLeft', 'lastTab', 'canvasWidth', function() {
    let lastTab = this.get('lastTab');
    if (lastTab) {
      let totalWidth = this.get('offsetLeft') + this.get('canvasWidth') - 64; /* lr paddings */
      return offsetRight(lastTab.$()) > totalWidth;
    }
  }),

  offsetLeft: 0,

  tabs: A([]),

  lastTab: computed.readOnly('tabs.lastObject'),

  wormhole: computed.readOnly('tabsContentWrapper.elementId'),

  selectedTab: computed('selected', 'tabs.[]', function() {
    return this.get('tabs')[this.get('selected')];
  }),

  focusIndex: computed.reads('selected'), // initial value

  updateOffsetLeft: observer('focusIndex', 'selected', 'tabs.[]', 'canvasWidth', 'shouldPaginate', 'shouldCenterTabs', function() {
    if (!this.get('shouldPaginate') || this.get('shouldCenterTabs')) {
      return this.set('offsetLeft', 0);
    }

    let focused = this.get('focusIndex');
    let selected = this.get('selected');
    let index = (focused === selected) ? selected : focused;

    let selectedTab = this.get('tabs')[index];
    if (!selectedTab || !selectedTab.$()) {
      return;
    }

    let canvasWidth = this.get('canvasWidth');
    let currentOffset = this.get('offsetLeft');
    let selectedTabOffset = selectedTab.$().prop('offsetLeft');
    let selectedTabWidth = selectedTab.$().prop('clientWidth');

    let newOffset = Math.max(currentOffset, (selectedTabOffset + selectedTabWidth) - canvasWidth + 64 /* lr paddings */);
    newOffset = Math.min(newOffset, selectedTabOffset);

    this.set('offsetLeft', newOffset);
  }),

  recomputeSizes: observer('shouldStretchTabs', function() {
    run.scheduleOnce('afterRender', this, function() {
      this.updatePagingSize();
      this.updateSelectedTabSizes();
      this.updateTabsHeight();
    });
  }),

  onSelectedTabDisabled: observer('selectedTab.disabled', function() {
    if (this.get('selectedTab.disabled')) {
      let closestValidTab = this.findClosestValidTab();
      if (closestValidTab) {
        this.send('selectTab', closestValidTab);
      }
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    let tabsWrapper = this.get('childComponents').find((child) => child.get('tagName') === 'md-tabs-wrapper');
    let tabsContentWrapper = this.get('childComponents').find((child) => child.get('tagName') === 'md-tabs-content-wrapper');
    let tabs = this.get('childComponents').filterBy('tagName', 'md-tab-item');

    let selected = this.get('selected');
    if (selected === undefined) {
      let enabledTabs = tabs.filter((tab) => tab.get('disabled') !== true);
      if (enabledTabs.length > 0) {
        selected = tabs.indexOf(enabledTabs[0]);
      }
    }

    let selectedTab;
    if (selected >= 0) {
      selectedTab = tabs[selected];
    } else {
      selected = null;
    }

    this.setProperties({
      tabs: A(tabs),
      tabsWrapper,
      tabsContentWrapper,
      selected,
      loaded: true,
      lastSelectedIndex: null
    });

    if (selectedTab) {
      selectedTab.one('onRendered', function() {
        this.updateTabsHeight();
        this.updateSelectedTabSizes();
      }.bind(this));
    }

    run.scheduleOnce('afterRender', this, function() {
      this.updateCanvasSize();
      this.updatePagingSize();
      this.updateIsMobile();
    });

    $(window).on(`resize.${this.elementId}`, function() {
      run.scheduleOnce('afterRender', this, function() {
        this.updateCanvasSize();
        this.updateIsMobile();
      });
    }.bind(this));
  },

  registerChild(child) {
    this._super(...arguments);
    if (this.get('loaded') && child.get('tagName') === 'md-tab-item') {
      this.get('tabs').pushObject(child);
      run.scheduleOnce('afterRender', this, function() {
        this.updatePagingSize();
      });
      if (this.get('autoSelect')) {
        this.send('selectTab', child);
      }
    }
  },

  unregisterChild(child) {
    this._super(...arguments);
    if (this.get('loaded') && child.get('tagName') === 'md-tab-item') {
      this.get('tabs').removeObject(child);
      run.scheduleOnce('afterRender', this, function() {
        this.updatePagingSize();
        let closestTab = this.findClosestValidTab();
        if (closestTab) {
          this.send('selectTab', closestTab);
        }
      });
    }
  },

  willDestroyElement() {
    $(window).off(`resize.${this.elementId}`);
    this._super(...arguments);
  },

  findClosestValidTab() {
    let currentIdx = this.get('selected');
    if (currentIdx === -1) {
      return null;
    }

    let tabs = this.get('tabs');
    let maxOffset = Math.max(tabs.length - currentIdx, currentIdx);
    let ensureValid = (tab) => tab && tab.get('disabled') !== true ? tab : undefined;

    for (let i = 0; i <= maxOffset; i++) {
      let tab = ensureValid(tabs[currentIdx + i]) || ensureValid(tabs[currentIdx - i]);
      if (tab) {
        return tab;
      }
    }
  },

  updateTabsHeight() {
    if (this.get('dynamicHeight')) {
      let $tab = this.get('tabsContentWrapper').$('md-tab-content.md-active');
      let tabsHeight = this.get('tabsWrapper').$().prop('scrollHeight');
      let activeTabHeight = $tab ? $tab.prop('scrollHeight') : null;
      if (tabsHeight && activeTabHeight) {
        this.set('height', tabsHeight + activeTabHeight);
      }
    }
  },

  updateSelectedTabSizes() {
    let selectedTab = this.get('selectedTab');
    if (selectedTab) {
      this.setProperties({
        selectedTabOffsetLeft: selectedTab.$().prop('offsetLeft'),
        selectedTabWidth: selectedTab.$().prop('clientWidth')
      });
    } else {
      this.setProperties({
        selectedTabOffsetLeft: null,
        selectedTabWidth: null
      });
    }
  },

  updatePagingSize() {
    let pagingWidth = 0;
    if (this.get('shouldStretchTabs')) {
      pagingWidth = this.get('canvasWidth');
    } else {
      let $items = this.get('tabsWrapper').$('md-tab-item');
      if ($items) {
        $items.each((_, tab) => pagingWidth += tab.clientWidth);
      }
    }
    this.set('pagingWidth', pagingWidth);
  },

  updateCanvasSize() {
    this.set('canvasWidth', this.get('tabsWrapper').$('md-tabs-canvas').prop('clientWidth'));
  },

  updateIsMobile() {
    this.set('isMobile', window.matchMedia(this.get('constants.MEDIA.xs')).matches);
  },

  actions: {
    nextPage() {
      let totalWidth = this.get('canvasWidth') + this.get('offsetLeft');
      let lastVisibleTab = this.get('tabs').find((tab) => offsetRight(tab.$()) > totalWidth);
      if (lastVisibleTab) {
        this.set('focusIndex', lastVisibleTab.get('index'));
      }
    },

    previousPage() {
      let offsetLeft = this.get('offsetLeft');
      let firstVisibleTab = this.get('tabs').find((tab)  => offsetRight(tab.$()) >= offsetLeft);
      if (firstVisibleTab) {
        this.set('focusIndex', firstVisibleTab.get('index'));
      }
    },

    selectTab(tab) {
      let newSelected = this.get('tabs').indexOf(tab);

      this.setProperties({
        lastSelectedIndex: this.get('selected'),
        selected: newSelected,
        focusIndex: newSelected
      });

      run.scheduleOnce('afterRender', this, function() {
        this.updateTabsHeight();
        this.updateSelectedTabSizes();
      });
    }
  }
});
