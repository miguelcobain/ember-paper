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
  attributeBindings: ['type'],
  tagName: 'button',
  classNames: ['paper-button', 'md-default-theme'],
  themed: true,
  classNameBindings: [
    'raised:md-raised',
    'iconButton:md-icon-button',
    'themed:md-default-theme',
    'themed:md-button'
  ],

  // Ripple Overrides
  rippleContainerSelector: null,
  fitRipple: computed.readOnly('isIconButton'),
  center: computed.readOnly('isIconButton'),
  dimBackground: computed.not('isIconButton'),

  noSpan: computed.readOnly('no-span'),

  click(event) {
    let onClick = this.get('onClick');
    if (isPresent(onClick)) {
      this.get('onClick')(event);
    }
  }
});
