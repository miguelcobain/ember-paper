import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { computed } = Ember;

export default Ember.Component.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-tab-item',
  classNames: ['md-tab'],
  classNameBindings: ['isActive:md-active'],
  tabs: computed.readOnly('parent.tabs'),
  activeTab: computed.readOnly('parent.activeTab'),
  activeTabIndex: computed.readOnly('parent.activeTabIndex'),
  wormhole: computed.readOnly('parent.wormhole'),

  rippleContainerSelector: null,

  tabIndex: Ember.computed('tabs.[]', function() {
    if (this.get('tabs')) {
      return this.get('tabs').indexOf(this.elementId);
    }
  }),

  isActive: Ember.computed('activeTab', function() {
    return (this.get('activeTab') === this.elementId) ? true : false;
  }),

  click() {
    this.get('parent').send('selectTab', this.elementId);
  },

  didInsertElement() {
    this._super();
    this.get('parent').send('createTab', this.elementId);
  },
  willDestroyElement() {
    this._super();
    this.get('parent').send('destroyTab', this.elementId);
  }
});
