import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';

var MdTabContent = Ember.Component.extend(LayoutRules, {
    tagName: 'md-tab-content',

    attributeBindings: ['tab', 'active'],

    tabContentWrapperComponent: Ember.computed.alias('parentView'),

    tabsComponent: Ember.computed.alias('tabContentWrapperComponent.parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    index: null,

    didInsertElement() {
        this._super(...arguments);
        this.setupTabContent();
    },

    setupTabContent() {
        var tabs = this.$().parent()[0].getElementsByTagName('md-tab-content'),
            index = Array.prototype.indexOf.call(tabs, this.$()[0]);
        this.set('index', index);
    },

    recalculateTabIndex: Ember.observer('tabs.[]', function() {

        if (!this.get('index')) {
            // we don't want to run this until the initial calculation has been performed on element insertion
            return;
        }

        // TODO: does this fire too often?
        //console.log('recalculating tabs');

        var tabs = this.$().parent()[0].getElementsByTagName('md-tab-content'),
            index = Array.prototype.indexOf.call(tabs, this.$()[0]);

        this.set('index', index);
    }),

    classNameBindings: ['tabIsRight:md-right', 'tabIsLeft:md-left', 'noTransition:md-no-transition', 'isActive:md-active', 'dynamicHeight:md-no-scroll'],

    tabIsRight: Ember.computed('tabsComponent.selectedIndex', 'index', function() {
        return this.get('index') > this.get('tabsComponent.selectedIndex');
    }),

    dynamicHeight: Ember.computed('tabsComponent.dynamicHeight', function() {
        return this.get('tabsComponent.dynamicHeight');
    }),

    tabIsLeft: Ember.computed('tabsComponent.selectedIndex', 'index', function() {
        return this.get('index') < this.get('tabsComponent.selectedIndex');
    }),

    noTransition: Ember.computed('tabsComponent.lastSelectedIndex', function() {
        return this.get('tabsComponent.lastSelectedIndex') == null;
    }),

    isActive: Ember.computed('tabsComponent.selectedIndex', 'index', function() {
        return this.get('index') === this.get('tabsComponent.selectedIndex');
    })
});

export default MdTabContent;

