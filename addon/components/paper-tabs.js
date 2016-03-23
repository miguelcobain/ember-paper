import Ember from 'ember';
const { computed, observer, $ } = Ember;

export default Ember.Component.extend({
  tagName: 'md-tabs',

  init() {
    this._super();
    if (!this.get('selected')) {
      this.set('activeTab', this.get('tabs.firstObject'));
    }
  },

  /* Settings */
  dynamicHeight: false,
  alignTabs: 'top',
  noInk: false,
  noInkBar: false,
  centerTabs: false,
  stretchTabs: 'always', // todo: find the best default

  classNames: ['md-primary'],
  classNameBindings: [
    'dynamicHeight:md-dynamic-height',
    'shouldStretchTabs:md-stretch-tabs'
  ],
  attributeBindings: [
    'alignTabsAttr:md-align-tabs',
    'borderBottomAttr:md-border-bottom',
    'styleAttr:style'
  ],

  /* Attributes Bindings */
  alignTabsAttr: computed('alignTabs', function() {
    return this.get('alignTabs'); // todo safestring
  }),
  borderBottomAttr: computed('borderBottom', function() {
    return this.get('borderBottom') ? 'md-border-bottom' : null;
  }),
  styleAttr: computed('heightStyle', function() {
    return `${this.get('heightStyle')} ${this.get('transitionStyle')}`;
  }),

  /* Style Bindings */
  heightStyle: computed('dynamicHeight', 'selectedTab.content.height', 'tabs.[]', 'tabsWrapper.height', function() {
    if (this.get('dynamicHeight')) {
      let tabsHeight = this.get('tabsWrapper.height');
      let selectedTab = this.get('selectedTab');
      if (selectedTab && (selectedTab.get('content.height') > 0)) {
        return `height: ${tabsHeight + selectedTab.get('content.height')}px;`;
      } else {
        return `height: ${tabsHeight}px;`;
      }
    }
    return '';
  }),
  transitionStyle: 'transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);',

  /* Logic Bindings */
  loaded: false, // set after render
  shouldStretchTabs: computed('stretchTabs', function() {
    switch (this.get('stretchTabs')) {
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        /* todo, check screen width for this */
        return (!this.get('shouldPaginate')/* && screen is <= 600px)*/);
    }
  }),
  shouldCenterTabs: computed('centerTabs', 'shouldPaginate', function() {
    return this.get('centerTabs') && !this.get('shouldPaginate');
  }),
  shouldPaginate: computed('loaded', 'noPagination', 'canvasWidth', 'pagingWidth', function() {
    if (this.get('noPagination') || !this.get('loaded')) {
      return false;
    }
    let canvasWidth = this.get('canvasWidth');
    let pagingWidth = this.get('pagingWidth');
    return ((canvasWidth - pagingWidth) < 0) ? true : false;
  }),
  pagingWidth: computed('tabs.[].id', 'shouldStretchTabs', function() {
    let context = this;
    let width = 0;
    this.get('tabs').forEach(function(tab) {
      if (tab.id) {
        let element = document.getElementById(tab.id);
        width += Math.max(element.offsetWidth, element.getBoundingClientRect().width);
      }
    });
    return Math.ceil(width);
  }),



  hasContent: computed('', function() {}), // todo
  maxTabWidth: computed('', function() {}), // todo
  canPageBack: computed.gt('offsetLeft', 0),
  canPageForward: computed('lastTab.offsetLeft', 'lastTab.offsetWidth', 'canvasWidth', 'offsetLeft', function() {
    if (this.get('lastTab')) {
      let lastTabOffsetLeft = this.get('lastTab.offsetLeft');
      let lastTabOffsetWidth = this.get('lastTab.offsetWidth');
      let canvasWidth = this.get('canvasWidth');
      let offsetLeft = this.get('offsetLeft');
      return (lastTabOffsetLeft + lastTabOffsetWidth > canvasWidth + offsetLeft);
    }
  }),

  canvasWidth: 0, // initial

  didInsertElement() {
    let context = this;
    Ember.run.scheduleOnce('afterRender', function() {
      context.set('canvasWidth', context.$().outerWidth());
      context.set('loaded', true);
    });
  },

  /* Tabs Instance */

  tabs: computed(function() {
    return Ember.A();
  }),

  lastTab: computed.alias('tabs.lastObject'),

  selected: computed('tabs.[]', function() {
    let tabs = Ember.A(this.get('tabs').filterBy('disabled', false));
    let active = Ember.A(tabs.filterBy('active'));
    if (active.get(length)) {
      return this.getTabIndex(active.get('firstObject'));
    } else if (tabs.get('length')) {
      return this.getTabIndex(tabs.get('firstObject'));
    }
  }),

  selectedChanged: observer('selected', function() {
    this.adjustOffset(this.get('selected'));
  }),

  lastSelectedIndex: null,

  selectedTab: computed('selected', 'tabs.[]', function() {
    return this.getTabByIndex(this.get('selected'));
  }),

  focusIndex: computed.reads('selected'), // initial value

  focusIndexChanged: observer('focusIndex', function() {
    if (this.get('focusIndex') !== this.get('selected')) {
      debugger;
      this.adjustOffset(this.get('focusIndex'));
    }
  }),

  focusTab: computed('tabs.[]', 'focusIndex', function() {
    return this.getTabByIndex(this.get('focusIndex'));
  }),

  adjustOffset(index) {
    if (!this.getTabByIndex(index) || this.get('shouldCenterTabs')) {
      return 0;
    }
    let tab = this.getTabByIndex(index);
    let left = $(`#${tab.get('id')}`).offset().left;
    let right = $(`#${tab.get('id')}`).outerWidth() + left;
    let offsetLeft = this.get('offsetLeft');
    let canvasWidth = this.get('canvasWidth');
    let newOffset = Math.max(offsetLeft, this.fixOffset(right - canvasWidth + 32 * 2));
    debugger;
    newOffset = Math.min(newOffset, this.fixOffset(left));
    return newOffset;
  },

  nextPage() {
    debugger;
    let canvasWidth = this.get('canvasWidth');
    let totalWidth = canvasWidth + this.get('offsetLeft');
    let i, tab, element;

    for (i = 0; i < this.get('tabs.length'); i++) {
      tab = this.get('tabs')[i];
      element = document.getElementById(tab.id);
      if (element.offsetLeft + element.clientWidth > totalWidth) {
        break;
      }
    }
    let tabOffset = document.getElementById(tab.get('id')).offsetLeft;
    this.set('offsetLeft', this.fixOffset(tabOffset));
  },

  previousPage() {

  },

  fixOffset(value) {
    if (!this.get('tabs.length') || !this.get('shouldPaginate')) {
      return 0;
    }
    let lastTab = this.get('tabs')[this.get('tabs.length') - 1];
    let lastTabElement = document.getElementById(lastTab.id);
    let totalWidth = lastTabElement.offsetLeft + lastTab.offsetWidth;
    let canvasWidth = this.get('canvasWidth');
    value = Math.max(0, value);
    value = Math.min(totalWidth - this.$().find('md-tabs-canvas')[0].clientWidth, value);
    return value;
  },

  setOffsetLeft: observer('focusIndex', 'selected', 'tabs.[]', 'shouldPaginate', function() {
    let focused = this.get('focusIndex');
    let selected = this.get('selected');
    let index = (focused === selected) ? selected : focused;
    return this.adjustOffset(index) + 32;
  }),

  offsetLeft: 0,

  /* Methods */

  getTabIndex(object) {
    return this.get('tabs').indexOf(object);
  },

  getTabByIndex(index) {
    return this.get('tabs')[index];
  },

  identifyTabsWrapper(object) {
    this.set('tabsWrapper', object);
  },

  actions: {
    nextPage() {
      if (this.get('canPageForward')) {
        this.nextPage();
      }
    },
    previousPage() {
      if (this.get('canPageBack')) {
        this.previousPage();
      }
    },
    setWormhole(id) {
      this.set('wormhole', id);
    },
    createTab(object) {
      this.get('tabs').pushObject(object);
    },
    destroyTab(object) {
      this.get('tabs').removeObject(object);
    },
    selectTab(object) {
      this.set('lastSelectedIndex', this.get('selected'));
      this.set('selected', this.getTabIndex(object));
    }
  }
});
