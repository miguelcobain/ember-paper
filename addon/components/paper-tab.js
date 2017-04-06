/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import injectService from 'ember-service/inject';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import { ChildMixin } from 'ember-composability-tools';
import layout from '../templates/components/paper-tab';

/**
 * @class PaperTab
 * @extends Component
 * @uses RippleMixin
 * @uses ColorMixin
 * @uses ChildMixin
 */
export default Component.extend(RippleMixin, ColorMixin, ChildMixin, {

  tagName: 'md-tab-item',

  layout,

  constants: injectService(),

  classNames: [
    'md-tab'
  ],

  classNameBindings: [
    'isActive:md-active',
    'disabled:md-disabled'
  ],

  /* Inherited from `{{paper-tabs}}` */
  selected: computed.readOnly('parentComponent.selected'),
  previous: computed.readOnly('parentComponent.previous'),
  tabs: computed.readOnly('parentComponent.tabs'),
  wormhole: computed.readOnly('parentComponent.wormhole'),
  noink: computed.readOnly('parentComponent.noInk'),

  rippleContainerSelector: null,

  index: computed('tabs.[]', function() {
    return this.get('tabs') ? this.get('tabs').indexOf(this) : -1;
  }),

  isActive: computed('index', 'selected', function() {
    return this.get('index') !== -1 && this.get('index') === this.get('selected');
  }),

  isLeft: computed('selected', 'index', function() {
    return this.get('index') !== -1 && this.get('index') < this.get('selected');
  }),

  isRight: computed('selected', 'index', function() {
    return this.get('index') !== -1 && this.get('index') > this.get('selected');
  }),

  // TODO would it be cleaner a tryInvoke(tab, 'onDeselect') by paper-tabs ?
  didDeselect: observer('isActive', function() {
    if (this.get('onDeselect')
      && this.get('index') !== -1 && this.get('index') === this.get('previous') && !this.get('isActive')) {
      return this.get('onDeselect')();
    }
  }),

  selectTab() {
    // TODO would it be cleaner a tryInvoke(tab, 'onSelect') by paper-tabs ?
    if (!this.get('disabled')) {
      if (this.get('onSelect')) {
        this.get('onSelect')();
      }
      this.get('parentComponent').send('selectTab', this);
    }
  },

  /* Events */

  keyDown(ev) {
    if (ev.which === this.get('constants.KEYCODE.ENTER') || ev.which === this.get('constants.KEYCODE.SPACE')) {
      this.selectTab();
    }
  },

  click() {
    this.selectTab();
  }
});
