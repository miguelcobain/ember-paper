import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import constants from '../utils/constants';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  checked: false,
  toggle: true,

  /* RippleMixin overrides */
  center: true,
  dimBackground: false,
  fitRipple: true,
  rippleContainerSelector: '.md-container',

  //bubble actions by default
  bubbles: true,
  click() {
    if (!this.get('disabled')) {
      this.toggleProperty('checked');
    }
    return this.get('bubbles');
  },

  keyPress(ev) {
    if (ev.which === constants.KEYCODE.SPACE) {
      this.click();
    }
  },

  processProxy() {
    this.toggleProperty('checked');
  }
});
