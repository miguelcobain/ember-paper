import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { computed, assert } = Ember;

export default BaseFocusable.extend(RippleMixin, ColorMixin, {
  tagName: 'md-radio-button',
  classNames: ['md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  tabindex: null,

  toggle: false,

  /* Ripple Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  // Lifecycle hooks
  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-radio}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');

    if (this.get('parentGroup')) {
      this.get('parentGroup').register(this);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('parentGroup')) {
      this.get('parentGroup').unregister(this);
    }
  },

  checked: computed('groupValue', 'value', function() {
    return this.get('groupValue') === this.get('value');
  }),

  click() {
    if (!this.get('disabled')) {
      if (this.get('toggle')) {
        this.get('onchange')(this.get('checked') ? null : this.get('value'));
      } else {
        this.get('onchange')(this.get('value'));
      }
    }
  }
});
