import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { inject, assert } = Ember;

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  /* Ripple Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  /* BaseFocusable Overrides */
  focusOnlyOnKey: true,

  constants: inject.service(),

  checked: false,

  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-checkbox}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
  },

  click() {
    if (!this.get('disabled')) {
      this.get('onchange')(!this.get('checked'));
    }
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE')) {
      this.click();
    }
  },

  processProxy() {
    this.get('onchange')(!this.get('checked'));
  }
});
