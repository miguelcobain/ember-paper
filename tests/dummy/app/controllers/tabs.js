import Ember from 'ember';
import BaseDemoController from '../controllers/base-demo-controller';

export default BaseDemoController.extend({

    init: function() {
        var content = [
            {name: 'hbs', content: 'tabs.hbs' },
            {name: 'controller', content: 'tabs-controller.js' }
        ];

        var staticTabContent = [
            {name: 'hbs', content: 'tabsStaticTabs.hbs'}
        ];

        this.setSourceFiles(content);

    },

    setStaticTabsContent: Ember.on('init', function() {
        var demoName = 'tabs-StaticTabs';

        var sourceFiles = Ember.ArrayProxy.create({
            content: Ember.A([
                {name: 'hbs', content: demoName + '.hbs'},
                {name: 'controller', content: 'tabs-staticTabs-controller.js'}
            ])
        });

        this.set('sourceFilesStaticTabs', sourceFiles);
    }),

    setDynamicHeightContent: Ember.on('init', function() {
        var demoName = 'tabs-dynamicHeight';

        var sourceFiles = Ember.ArrayProxy.create({
            content: Ember.A([
                {name: 'hbs', content: demoName + '.hbs'}
            ])
        });

        this.set('sourceFilesDynamicHeight', sourceFiles);
    }),

    tabs: Ember.ArrayProxy.create({
        content: Ember.A([
            { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
            { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
            { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
            { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
            { title: 'Five', content: "If you remove a tab, it will try to select a new one."},
            { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
            { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
            { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
            { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
            { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"}
        ])
    }),

    cantRemoveTabs: Ember.computed('tabs.length', function() {

        return this.get('tabs.length') <= 1;
    }),

    selectedIndex: 2,

    selectedTab: Ember.computed('selectedIndex', 'tabs.[]', function() {
        return this.get('tabs').objectAt(this.get('selectedIndex'));
    }),

    data: {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    },

    alignTabs: Ember.computed('data.bottom', function() {
        return this.get('data.bottom') ? 'bottom' : 'top';
    }),

    actions: {
        showSource: function() {
            this.toggleProperty('showSource');
        },

        showSourceStaticTabs: function() {
            this.toggleProperty('showSourceStaticTabs');
        },

        showSourceDynamicHeight: function() {
            this.toggleProperty('showSourceDynamicHeight');
        },

        addTab: function() {
            var title = this.get('tTitle'),
                content = this.get('tContent');

            this.get('tabs').pushObject({
                title: title,
                content: content || title + " Content View"
            });
        },

        removeTab: function() {
            this.get('tabs').removeAt(this.get('selectedIndex'));
        }
    }
});
