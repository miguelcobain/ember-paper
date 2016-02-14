import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

export default Ember.Component.extend({
  tagName: 'md-menu-content',

  constants: Ember.inject.service(),

  classNames: ['md-default-theme'],
  attributeBindings: ['width'],
  width: 4,

  menuAbstract: Ember.computed(function() {
    let container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  keyDown(ev) {
    let KeyCodes = this.get('constants').KEYCODE;
    switch (ev.keyCode) {
      case KeyCodes.get('ESCAPE'):
        this.get('menuAbstract').send('toggleMenu');
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
    let _self = this;
    // kick off initial focus in the menu on the first element

    Ember.run.later(function() {
      let focusTarget = _self.$().find('.md-menu-focus-target');
      if (!focusTarget.length) {
        focusTarget = _self.$().children().eq(0).children().eq(0);
      }
      focusTarget.focus();
    });
  },

  focusMenuItem(e, direction) {
    let currentItem = Ember.$(e.target).closest('md-menu-item');

    let children = this.$().children();
    let items = Ember.$.makeArray(children);
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
  },

  checkClickTarget(e) {
    let { target } = e;

    // Traverse up the event until we get to the menuAbstract to see
    // if there is a click and that the element is not disabled
    do {
      if (target === this.get('element')) {
        return;
      }

      if (target.hasAttribute('action')) {
        if (!target.hasAttribute('disabled')) {
          this.get('menuAbstract').send('toggleMenu');
        }
        break;
      }
    } while (target = target.parentNode);

  },

  click(e) {
    this.checkClickTarget(e);
  }

});
