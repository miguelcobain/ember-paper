import Ember from 'ember';
const { computed, observer, $, run } = Ember;

export default Ember.Component.extend({
  tagName: 'md-tabs',

  /* Settings */
  dynamicHeight: false,
  alignTabs: 'top',
  noInk: false,
  noInkBar: false,
  centerTabs: false,
  stretchTabs: 'auto', // todo: find the best default

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
  shouldStretchTabs: computed('stretchTabs', 'canvasWidth', function() {
    switch (this.get('stretchTabs')) {
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        return (!this.get('shouldPaginate') && (this.get('canvasWidth') <= 600));
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
    console.log('canvasWidth');
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
  canPageForward: computed(
    'lastTab.offsetLeft',
    'lastTab.offsetWidth',
    'selectedTab.offsetLeft',
    'selectedTab.offsetWidth',
    'canvasWidth',
    'offsetLeft', function() {
    if (this.get('lastTab')) {
      let context = this;
      let lastTab = context.$(`#${context.get('lastTab.id')}`)[0];
      let pagingWidth = lastTab.offsetLeft + lastTab.clientWidth;
      let offset = context.$('md-tabs-canvas')[0].clientWidth + context.get('offsetLeft');
      return (pagingWidth > offset);
    }
  }),

  /* sets the initial value as a computed property */
  canvasWidth: 0,

  didRender() {
    let context = this;
    Ember.run.scheduleOnce('afterRender', function() {
      context.set('loaded', true);
      context.set('canvasWidth', context.$().outerWidth());
      $(window).on('resize', Ember.run.bind(context, function() {
        this.set('canvasWidth', this.$().outerWidth());
      }));
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

  initialSelection: observer('selected', 'tabs.[]', function() {
    if (!this.get('selected') && this.get('selected') !== 0) {
      let tabs = Ember.A(this.get('tabs').filterBy('disabled', false));
      let active = Ember.A(tabs.filterBy('active'));
      if (active.get(length)) {
        this.set('selected', this.getTabIndex(active.get('firstObject')));
      } else if (tabs.get('length')) {
        this.set('selected', this.getTabIndex(tabs.get('firstObject')));
      }
    }
  }),

  lastSelectedIndex: null,

  selectedTab: computed('selected', 'tabs.[]', function() {
    return this.getTabByIndex(this.get('selected'));
  }),

  focusIndex: computed.reads('selected'), // initial value

  disabledSelectedTab: observer('selectedTab.disabled', function() {
    if (this.get('selectedTab.disabled')) {
      this.set('selected', this.getNearestSafeIndex(this.get('selected')));
    }
  }),

  /*focusIndexChanged: observer('focusIndex', function() {
    this.adjustOffset(this.get('focusIndex'));
  }),

  selectedChanged: observer('selected', function() {
    this.adjustOffset(this.get('selected'));
  }),*/

  focusTab: computed('tabs.[]', 'focusIndex', function() {
    return this.getTabByIndex(this.get('focusIndex'));
  }),

  adjustOffset: observer('focusIndex', 'selected', function() {
    let index = this.get('focusIndex') || this.get('selected');
    if (!this.getTabByIndex(index) || this.get('shouldCenterTabs')) {
      return 0;
    }
    let tab = this.getTabByIndex(index);
    let left = $(`#${tab.get('id')}`)[0].offsetLeft;
    let right = $(`#${tab.get('id')}`)[0].clientWidth + left;
    let offsetLeft = this.get('offsetLeft');
    let canvasWidth = this.$('md-tabs-canvas')[0].clientWidth;
    let newOffset = Math.max(offsetLeft, this.fixOffset(right - canvasWidth + 32 * 2));
    newOffset = Math.min(newOffset, this.fixOffset(left));
    this.set('offsetLeft', newOffset);
  }),

  nextPage() {
    let canvasWidth = this.get('canvasWidth');
    let totalWidth = canvasWidth + this.get('offsetLeft');
    let i, tab, element;

    for (i = 0; i < this.get('tabs.length'); i++) {
      tab = document.getElementById(this.get('tabs')[i].id);
      if (tab.offsetLeft + tab.clientWidth > totalWidth) {
        break;
      }
    }
    this.set('offsetLeft', this.fixOffset(tab.offsetLeft));
  },

  previousPage() {
    let i, tab;
    for (i = 0; i < this.get('tabs.length'); i++) {
      tab = document.getElementById(this.get('tabs')[i].id);
      if (tab.offsetLeft + tab.offsetWidth >= this.get('offsetLeft')) {
        break;
      }
     }
     let canvasWidth = this.$('md-tabs-canvas')[0].clientWidth;
     this.set('offsetLeft', this.fixOffset(tab.offsetLeft + tab.offsetWidth - canvasWidth));
  },

  fixOffset(value) {
    if (!this.get('tabs.length') || !this.get('shouldPaginate')) {
      return 0;
    }
    let lastTab = this.get('tabs')[this.get('tabs.length') - 1];
    let lastTabElement = document.getElementById(lastTab.id);
    let totalWidth = lastTabElement.offsetLeft + lastTab.offsetWidth;
    let canvasWidth = this.$('md-tabs-canvas')[0].clientWidth;
    value = Math.max(0, value);
    value = Math.min(totalWidth - canvasWidth, value);
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

  getNearestSafeIndex(newIndex) {
    if (newIndex === -1) {
      return -1;
    }
    let maxOffset = Math.max(this.get('tabs').length - newIndex, newIndex);
    let i;
    let tab;

    for (i = 0; i <= maxOffset; i++) {
      tab = this.getTabByIndex(newIndex + i);
      if (tab && (tab.get('disabled') !== true)) {
        return this.getTabIndex(tab);
      }
      tab = this.getTabByIndex(newIndex - i);
      if (tab && (tab.get('disabled') !== true)) {
        return this.getTabIndex(tab);
      };
    }
    return newIndex;
  },

  identifyTabsWrapper(object) {
    this.set('tabsWrapper', object);
  },

  /* Events */

  keyDown(ev) {
    debugger;
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
