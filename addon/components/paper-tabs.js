import Ember from 'ember';
const { computed } = Ember;

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
  canPageBack: computed('', function() {

  }),
  canPageForward: computed('', function() {

  }),
  canvasWidth: 0, // initial

  didInsertElement: function() {
    var context = this;
    Ember.run.scheduleOnce('afterRender', function() {
      context.set('canvasWidth', context.$().outerWidth());
      context.set('loaded', true);
    });
  },

  /* Tabs Instance */

  tabs: computed(function() {
    return Ember.A();
  }),

  selected: computed('tabs.[]', function() {
    let tabs = Ember.A(this.get('tabs').filterBy('disabled', false));
    let active = Ember.A(tabs.filterBy('active'));
    if (active.get(length)) {
      return this.getTabIndex(active.get('firstObject'));
    } else if (tabs.get('length')) {
      return this.getTabIndex(tabs.get('firstObject'));
    }
  }),

  lastSelectedIndex: null,

  selectedTab: computed('selected', 'tabs.[]', function() {
    return this.getTabByIndex(this.get('selected'));
  }),

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
