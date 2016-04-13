import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { computed } = Ember;

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  attributeBindings: ['type'],
  type: 'button',
  tagName: 'button',
  classNames: ['paper-button', 'md-default-theme', 'md-button'],
  classNameBindings: [
    'raised:md-raised',
    'iconButton:md-icon-button'
  ],

  // Ripple Overrides
  rippleContainerSelector: null,
  fitRipple: computed.readOnly('iconButton'),
  center: computed.readOnly('iconButton'),
  dimBackground: computed.not('iconButton'),

  click(event) {
    this.sendAction('onClick', event);
  }
});
