import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

const { $, Component, inject: { service }, run: { later } } = Ember;

export default Component.extend({
  tagName: 'md-menu-content',

  constants: service(),

  classNames: ['md-default-theme'],
  classNameBindings: ['dense:md-dense'],
  attributeBindings: ['width'],
  width: 4,
  dense: false,

  // menuAbstract: Ember.computed(function() {
  //   let container = this.nearestOfType(PaperMenuAbstract);
  //   return container;
  // }),
  //
  keyDown(ev) {
    let KeyCodes = this.get('constants').KEYCODE;
    switch (ev.keyCode) {
      case KeyCodes.get('ESCAPE'):
        this.nearestOfType(PaperMenuAbstract).send('toggleMenu');
        break;
      case KeyCodes.get('UP_ARROW'):
        this.focusMenuItem(ev, -1);
        break;
      case KeyCodes.get('DOWN_ARROW'):
        this.focusMenuItem(ev, 1);
        break;
    }
  },

  didInsertElement() {
    // kick off initial focus in the menu on the first element
    later(() => {
      let focusTarget = this.$().find('.md-menu-focus-target');
      if (!focusTarget.length) {
        focusTarget = this.$().children().eq(0).children().eq(0);
      }
      focusTarget.focus();
    });
  },

  focusMenuItem(e, direction) {
    let currentItem = $(e.target).closest('md-menu-item');

    let children = this.$().children();
    let items = $.makeArray(children);
    let currentIndex = children.index(currentItem);

    // Traverse through our elements in the specified direction (+/-1) and try to
    // focus them until we find one that accepts focus
    for (let i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) {
      let focusTarget = items[i].firstElementChild || items[i];
      let didFocus = this.attemptFocus(focusTarget);
      if (didFocus) {
        break;
      }
    }
  },
  attemptFocus(el) {
    if (el && el.getAttribute('tabindex') !== -1) {
      el.focus();
      if (document.activeElement === el) {
        return true;
      } else {
        return false;
      }
    }
  }

});
