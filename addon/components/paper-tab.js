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
  disabled: computed.alias('self.disabled'),
  active: computed.alias('self.active'),
  selected: computed.reads('parent.selected'),
  previous: computed.reads('parent.previous'),
  tabs: computed.readOnly('parent.tabs'),
  wormhole: computed.readOnly('parent.wormhole'),

  /* Settings */
  noInk: computed.reads('parent.noInk'),  // todo: noink to noInk support

  rippleContainerSelector: null,

  index: computed('tabs.[]', 'self', function() {
    let index = this.get('tabs').indexOf(this.get('self'));
    this.get('self').set('index', index);
    return index;
  }),

  activeState: computed.equal('index', 'selected'),

  setActive: Ember.observer('active', function() {
    if (this.get('active')) {
      this.send('selectTab');
    }
  }),

  didDeselect: Ember.observer('previous', 'activeState', function() {
    if ((this.get('index') !== this.get('previous')) || this.get('activeState')) {
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

  setTargetTabHeight() {
    let height = $(`#${this.get('self.content')}`).height();
    this.set('self.height', height);
  },

  didInsertElement() {
    this.get('parent.tabs').pushObject(this.get('self'));
  },

  updateBounding: Ember.observer('tabs.[]', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      let { left } = this.$().offset();
      let width = this.$().outerWidth();
      this.set('self.left', left);
      this.set('self.width', width);
      this.set('self.right', (left + width));
    });
  }),

  self: computed(function() {
    let { elementId } = this;
    return Ember.Object.create({
      id: elementId,
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
