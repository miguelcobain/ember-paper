import Ember from 'ember';
import BaseFocusableMixin from '../mixins/base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

var KEY_CODE_SPACE = 32;

export default Ember.Component.extend(BaseFocusableMixin, RippleMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  checked: false,
  toggle: true,

  /* RippleMixin overrides */
  center: true,
  dimBackground: false,
  rippleContainerSelector: '.md-container',

  click: function() {
    if (!this.get('disabled')) {
      this.toggleProperty('checked');
    }
  },

  keyPress: function(ev) {
    if (ev.which === KEY_CODE_SPACE) {
      this.click();
    }
  }
});
