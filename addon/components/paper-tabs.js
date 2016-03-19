import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super();
    if (!this.get('selected')) {
      this.set('activeTab', this.get('tabs.firstObject') );
    }
  },
  tagName: '',

  getIndex(object) {
    return this.get('tabs').indexOf(object);
  },

  getTabByIndex(index) {
    return this.get('tabs')[index];
  },

  /* this property is for dev: to be deleted */
  active: Ember.computed('selected', function(){
    return this.getTabByIndex(this.get('selected'));
  }),

  tabs: Ember.computed(function() {
    return Ember.A();
  }),

  selected: Ember.computed('tabs.[]', function(){
    var tabs = Ember.A(this.get('tabs').filterBy('disabled', false));
    if ( tabs.get('length')) {
      return this.getIndex(tabs.get('firstObject'));
    }
  }),

  previous: null,

  selectedTab: Ember.computed('selected', 'tabs.[]', function(){
    return this.getTabByIndex(this.get('selected'));
  }),

  tabDirection: Ember.computed('previous', 'selected', function() {
    return (this.get('previous') > this.get('selected')) ? "right" : "left";
  }),

  /* customization options */
  dynamicHeight: false,
  alignTabs: "top",

  heightStyle: Ember.computed('dynamicHeight', 'selectedTab.content.height', 'tabs.[]', 'tabsWrapper.height', function(){
    if (this.get('dynamicHeight')) {
      var tabsHeight = this.get('tabsWrapper.height');
      var selectedTab = this.get('selectedTab');
      if (selectedTab && selectedTab.get('content.height')) {
        return 'height: ' + (tabsHeight + selectedTab.get('content.height')) + 'px;';
      } else {
        return 'height: 0px';
      }
    }
  }),

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
      this.set('previous', this.get('selected'));
      this.set('selected', this.getIndex(object));
    }
  }
});
