import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default Ember.Component.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-tab-item',
  classNames: ['md-tab'],
  classNameBindings: ['isActive:md-active'],
  tabsBinding: 'parent.tabs',
  activeTabBinding: 'parent.activeTab',
  activeTabIndexBinding: 'parent.activeTabIndex',
  wormholeBinding: 'parent.wormhole',

  rippleContainerSelector: null,

  tabIndex: Ember.computed('tabs.[]', function() {
    if (this.get('tabs')) {
      return this.get('tabs').indexOf(this.elementId);
    }
  }),

  isActive: Ember.computed('activeTab', function(){
    return (this.get('activeTab') === this.elementId) ? true : false;
  }),

  click() {
    this.get('parent').send('selectTab', this.elementId);
  },

  didInsertElement: function() {
    this._super();
    this.get('parent').send('createTab', this.elementId);
  },
  willDestroyElement: function() {
    this._super();
    this.get('parent').send('destroyTab', this.elementId);
  }
});
