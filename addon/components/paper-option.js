/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-option';
import PaperMenuItem from './paper-menu-item';
import RippleMixin from '../mixins/ripple-mixin';

const { computed } = Ember;

/**
 * @class PaperOption
 * @extends PaperMenuItem
 * @uses RippleMixin
 */
export default PaperMenuItem.extend(RippleMixin, {
  layout,
  tagName: 'md-option',
  attributeBindings: ['aria-selected', 'aria-disabled', 'aria-current', 'data-option-index', 'role', 'selected', 'tabindex'],
  rippleContainerSelector: null,
  tabindex: '0',
  fitRipple: computed.readOnly('isIconButton'),
  center: computed.readOnly('isIconButton'),
  dimBackground: computed.not('isIconButton')
});
