import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'md-tabs',

  init() {
    this._super();
    if (!this.get('selected')) {
      this.set('activeTab', this.get('tabs.firstObject') );
    }
  },

  /* Settings */
  dynamicHeight: false,
  alignTabs: "top",
  noInk: false,
  noInkBar: false,
  centerTabs: false,
  stretchTabs: "always", // todo: find the best default

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
  styleAttr: computed('heightStyle', function(){
    return this.get('heightStyle') + 'transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);';
  }),

  /* Style Bindings */
  heightStyle: computed('dynamicHeight', 'selectedTab.content.height', 'tabs.[]', 'tabsWrapper.height', function(){
    if (this.get('dynamicHeight')) {
      var tabsHeight = this.get('tabsWrapper.height');
      var selectedTab = this.get('selectedTab');
      if (selectedTab && selectedTab.get('content.height')) {
        return 'height: ' + (tabsHeight + selectedTab.get('content.height')) + 'px;';
      } else {
        return 'height: 0px';
      }
    }
    return '';
  }),

  /* Class Bindings */
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
  shouldPaginate: computed('noPagination', 'tab.[]', function() {
    /* todo: implement loaded based on DOM rendering */
    if (this.get('noPagination') || !this.get('loaded')) {
      return false;
    }
  }),

  /* Tabs Instance */

  tabs: computed(function() {
    return Ember.A();
  }),

  selected: computed('tabs.[]', function(){
    var tabs = Ember.A(this.get('tabs').filterBy('disabled', false));
    var active = Ember.A(tabs.filterBy('active'));
    if (active.get(length)) {
      return this.getTabIndex(active.get('firstObject'));
    } else if ( tabs.get('length')) {
      return this.getTabIndex(tabs.get('firstObject'));
    }
  }),

  previous: null,

  selectedTab: computed('selected', 'tabs.[]', function(){
    return this.getTabByIndex(this.get('selected'));
  }),

  tabDirection: computed('previous', 'selected', function() {
    return (this.get('previous') > this.get('selected')) ? "right" : "left";
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
      debugger;
      this.get('tabs').pushObject(object);
    },
    destroyTab(object) {
      this.get('tabs').removeObject(object);
    },
    selectTab(object) {
      this.set('previous', this.get('selected'));
      this.set('selected', this.getTabIndex(object));
    }
  }
});
