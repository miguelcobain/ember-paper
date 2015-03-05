import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

var KEY_CODE_SPACE = 32;

export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  //Alow element to be focusable by supplying a tabindex 0
  attributeBindings: ['tabindex'],
  tabindex: function() {
    return this.get('disabled') ? '-1' : '0';
  }.property('disabled'),

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
