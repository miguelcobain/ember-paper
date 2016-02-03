import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/button-ripple-mixin';

export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-option',

  constants: Ember.inject.service(),


  attributeBindings: ['selected', 'isDisabled:disabled'],

  focus: false,

  isDisabled: Ember.computed('disabled', function () {
    return this.get('disabled') ? 'disabled' : null;
  }),


  menuAbstract: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),


  click(ev) {
    this.selectListener(ev);
  },

  keyDown (ev) {
    if (ev.keyCode === this.get('constants').KEYCODE.get('ENTER') || ev.keyCode === this.get('constants').KEYCODE.get('SPACE')) {
      this.selectListener(ev);
    }
  },


  selectListener(ev) {
    var selectMenu = this.get('menuAbstract'),
      isSelected = this.get('selected');

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

  selected: Ember.computed('menuAbstract.model', function () {
    return this.get('menuAbstract').get('model') === this.get('value') ? 'selected' : null;
  })
});
