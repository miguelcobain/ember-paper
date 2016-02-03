import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  /* Ripple Overrides */
  rippleContainerSelector: '.md-container',
  center: true,
  dimBackground: false,
  fitRipple: true,

  constants: Ember.inject.service(),

  checked: false,
  toggle: true,


  //bubble actions by default
  bubbles: true,
  click() {
    if (!this.get('disabled')) {
      this.toggleProperty('checked');
    }
    return this.get('bubbles');
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE')) {
      this.click();
    }
  },

  processProxy() {
    this.toggleProperty('checked');
  }
});
