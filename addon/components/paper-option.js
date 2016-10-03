/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

const { inject, computed } = Ember;

/**
 * @class PaperOption
 * @extends BaseFocusable
 * @uses RippleMixin
 */
export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-option',

  constants: inject.service(),

  /* Ripple Overrides */
  rippleContainerSelector: null,
  fitRipple: computed.readOnly('isIconButton'),
  center: computed.readOnly('isIconButton'),
  dimBackground: computed.not('isIconButton'),

  attributeBindings: ['selected', 'isDisabled:disabled'],

  focus: false,

  isDisabled: computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  }),

  menuAbstract: computed(function() {
    let container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  click(ev) {
    this.selectListener(ev);
  },

  keyDown(ev) {
    if (ev.keyCode === this.get('constants').KEYCODE.get('ENTER') || ev.keyCode === this.get('constants').KEYCODE.get('SPACE')) {
      this.selectListener(ev);
    }
  },

  selectListener(ev) {
    let selectMenu = this.get('menuAbstract');
    let isSelected = this.get('selected');

    if (this.get('disabled')) {
      ev.stopImmediatePropagation();
      return;
    }

    if (selectMenu.get('multiple')) {
      if (isSelected) {
        selectMenu.send('deselect', this.get('value'));
      } else {
        selectMenu.send('selectOption', this.get('value'));
      }
    } else {
      if (!isSelected) {
        selectMenu.send('deselectOption', this.get('value'));
        selectMenu.send('selectOption', this.get('value'));
      }
    }
    this.get('menuAbstract').send('toggleMenu');
  },

  selected: computed('menuAbstract.value', function() {
    return this.get('menuAbstract').get('value') === this.get('value') ? 'selected' : null;
  })
});
