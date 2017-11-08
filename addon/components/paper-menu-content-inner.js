/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-menu-content-inner';
import ParentMixin from 'ember-paper/mixins/parent-mixin';
const { Component, inject, computed, run } = Ember;

/**
 * @class PaperMenuContentInner
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'md-menu-content',
  attributeBindings: ['width'],
  classNameBindings: ['dense:md-dense'],

  constants: inject.service(),
  enabledMenuItems: computed.filterBy('childComponents', 'disabled', false),

  didInsertElement() {
    run.later(() => {
      let focusTarget = this.$().find('.md-menu-focus-target');
      if (!focusTarget.length) {
        focusTarget = this.get('enabledMenuItems.firstObject.element.firstElementChild');
      }
      if (focusTarget) {
        focusTarget.focus();
      }
    });
  },

  keyDown(ev) {
    switch (ev.which) {
      case this.get('constants.KEYCODE.ESCAPE'):
        this.dropdown.actions.close();
        break;
      case this.get('constants.KEYCODE.LEFT_ARROW'):
      case this.get('constants.KEYCODE.UP_ARROW'):
        ev.preventDefault();
        this.focusMenuItem(ev, -1);
        break;
      case this.get('constants.KEYCODE.RIGHT_ARROW'):
      case this.get('constants.KEYCODE.DOWN_ARROW'):
        ev.preventDefault();
        this.focusMenuItem(ev, 1);
        break;
    }
  },

  focusMenuItem(e, direction) {
    let currentItem = this.$(e.target).closest('md-menu-item');

    let children = this.get('enabledMenuItems');
    let items = children.map((child) => child.element);

    let currentIndex = items.indexOf(currentItem[0]);

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
