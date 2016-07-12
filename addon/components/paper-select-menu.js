import Ember from 'ember';
import PaperMenuContentInner from './paper-menu-content-inner';

const { computed, run } = Ember;

export default PaperMenuContentInner.extend({
  tagName: 'md-select-menu',
  classNames: ['md-default-theme'],
  classNameBindings: ['searchEnabled:md-overflow'],
  enabledOptions: computed.filterBy('childComponents', 'disabled', false),
  didInsertElement() {
    run.later(() => {
      let focusTarget = this.$().find('.md-menu-focus-target');
      if (!focusTarget.length) {
        focusTarget = this.get('enabledOptions.firstObject.element');
      }
      focusTarget.focus();
    }, 50);
  },

  keyDown(ev) {
    switch (ev.which) {
      case this.get('constants.KEYCODE.ESCAPE'):
        this.dropdown.actions.close();
        break;
      case this.get('constants.KEYCODE.LEFT_ARROW'):
      case this.get('constants.KEYCODE.UP_ARROW'):
        ev.preventDefault();
        this.focusOption(ev, -1);
        break;
      case this.get('constants.KEYCODE.RIGHT_ARROW'):
      case this.get('constants.KEYCODE.DOWN_ARROW'):
        ev.preventDefault();
        this.focusOption(ev, 1);
        break;
    }
  },

  focusOption(e, direction) {
    let currentItem = this.$(e.target).closest('md-option');

    let children = this.get('enabledMenuItems');
    let items = children.map((child) => child.element);

    let currentIndex = items.indexOf(currentItem[0]);

    // Traverse through our elements in the specified direction (+/-1) and try to
    // focus them until we find one that accepts focus
    for (let i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) {
      let focusTarget = items[i];
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
