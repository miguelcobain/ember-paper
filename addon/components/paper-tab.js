import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import BaseFocusable from './base-focusable';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { computed } = Ember;

export default Ember.Component.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-tab-item',
  classNames: ['md-tab'],
  classNameBindings: ['activeState:md-active', 'disabled:md-disabled'],

  /* explicit defaults */
  disabled: Ember.computed.alias('self.disabled'),
  index: Ember.computed.alias('self.index'),
  active: Ember.computed.alias('self.active'),
  selected: computed.reads('parent.selected'),
  previous: computed.reads('parent.previous'),
  tabs: computed.readOnly('parent.tabs'),
  wormhole: computed.readOnly('parent.wormhole'),

  rippleContainerSelector: null,

  index: Ember.computed('tabs.[]', 'self', function(){
    var index = this.get('tabs').indexOf(this.get('self'));
    return this.get('self').set('index', index);
  }),

  activeState: Ember.computed('index', 'selected', function(){
    var active = (this.get('index') === this.get('selected'));
    return active;
  }),

  setActive: Ember.observer('active', function(){
    if (this.get('active')) {
      this.send('selectTab');
    }
  }),

  didDeselect: Ember.observer('previous', 'activeState', function(){
    if ( (this.get('index') !== this.get('previous')) || this.get('activeState')) {
      return;
    }
    if (this.get('onDeselect')) {
      return this.get('onDeselect')();
    }
  }),

  willDestroyElement() {
    this._super();
    this.get('parent').send('destroyTab', this.get('self'));
  },

  setTargetTabHeight: function() {
    var height = $('#'+this.get('self.content')).height();
    this.set('self.height', height);
  },

  didInsertElement: function() {
    this.get('parent.tabs').pushObject(this.get('self'));
    Ember.run.scheduleOnce('afterRender', this, function() {
      var left = this.$()[0].offsetLeft;
      var width = this.$().outerWidth();
      this.set('self.left', left);
      this.set('self.width', width);
      this.set('self.right', (left + width));
    });
  },

  self: Ember.computed(function(){
    return Ember.Object.create({
      id: this.elementId,
      disabled: false,
      left: 0,
      right: 0,
      width: 0
    });
  }),

  click() {
    if (!this.get('disabled')) {
      this.send('selectTab');
    }
  },

  actions: {
    setContent(id) {
      this.set('self.content', id);
    },
    setHeight(value) {
      this.set('self.height', value);
    },
    selectTab() {
      if (this.get('onSelect')) {
        this.get('onSelect')();
      }
      this.get('parent').send('selectTab', this.get('self'));
    },
    identifyTabContent(object) {
      this.get('self').set('content', object);
    }
  }
});
