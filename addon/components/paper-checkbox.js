import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  constants: Ember.inject.service(),

  //Alow element to be focusable by supplying a tabindex 0
  attributeBindings: ['tabindex', 'role', 'ariaLabel:aria-label'],
  tabindex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),
  role: 'checkbox',

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
    if (ev.which === this.get('constants.KEYCODE.SPACE')) {
      this.click();
    }
  },

  processProxy() {
    this.toggleProperty('checked');
  },
  ariaLabel: Ember.computed('label', function () {
    return this.get("label") || null;
  })

});
