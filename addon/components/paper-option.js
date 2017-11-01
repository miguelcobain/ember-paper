/**
 * @module ember-paper
 */
import { readOnly, not } from '@ember/object/computed';

import layout from '../templates/components/paper-option';
import PaperMenuItem from './paper-menu-item';
import RippleMixin from '../mixins/ripple-mixin';

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
  fitRipple: readOnly('isIconButton'),
  center: readOnly('isIconButton'),
  dimBackground: not('isIconButton')
});
