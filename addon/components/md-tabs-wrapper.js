import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';

var MdTabWrapper = Ember.Component.extend(LayoutRules, {
  tagName: 'md-tabs-wrapper',
  classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

  tabsComponent: Ember.computed.alias('parentView'),

  tabs: Ember.computed.alias('tabsComponent.tabs'),

  shouldStretchTabs: Ember.computed('tabsComponent.shouldStretchTabs', function() {
    return this.get('tabsComponent.shouldStretchTabs');
  }),

  shouldPaginate: Ember.computed('tabsComponent.shouldPaginate', function() {
    return this.get('tabsComponent.shouldPaginate');
  }),

  //shouldCenterTabs: Ember.computed('tabsComponent.shouldCenterTabs', function() {
  //  return this.get('tabsComponent.shouldCenterTabs');
  //})
});

export default MdTabWrapper;
