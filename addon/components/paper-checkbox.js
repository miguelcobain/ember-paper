import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { inject, assert, computed, get, isEmpty } = Ember;

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['value:md-checked'],

  // Paper item secondary container class
  isSecondary: computed('class', {
    get() {
      let cls = get(this, 'class');
      if (!isEmpty(cls)) {
        return cls.indexOf('md-secondary') !== -1;
      } else {
        return false;
      }
    }
  }),
  isProxyHandlerSet: false,

  /* Ripple Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  /* BaseFocusable Overrides */
  focusOnlyOnKey: true,

  constants: inject.service(),

  value: false,

  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-checkbox}} requires an `onChange` action', !!this.get('onChange'));
  },

  click() {
    if (!this.get('disabled')) {
      this.sendAction('onChange', !this.get('value'));
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
      ev.preventDefault();
      this.click();
    }
  },

  processProxy() {
    this.sendAction('onChange', !this.get('value'));
  }
});
