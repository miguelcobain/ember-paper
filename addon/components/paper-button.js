import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const {
  assert,
  computed,
  isPresent
} = Ember;

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  attributeBindings: ['target', 'action', 'type'],
  tagName: 'button',
  themed: true,
  classNameBindings: [
    'raised:md-raised',
    'icon-button:md-icon-button',
    'focus:md-focused',
    'themed:md-default-theme',
    'themed:md-button'
  ],

  // Ripple Overrides
  rippleContainerSelector: null,
  fitRipple: computed.readOnly('isIconButton'),
  center: computed.readOnly('isIconButton'),
  dimBackground: computed.not('isIconButton'),

  noSpan: computed.readOnly('no-span'),

  // RippleMixin overrides
  isIconButton: computed({
    get() {
      return this.classNames.any(function(className) {
        return className.indexOf('md-icon-button') !== -1;
      });
    }
  }),

  isMenuItem: computed({
    get() {
      return this.classNames.any(function(className) {
        return className.indexOf('md-menu-item') !== -1;
      });
    }
  }),

  click(event) {
    let onClick = this.get('onClick');
    if (isPresent(onClick)) {
      this.get('onClick')(event);
    }
  }
});
