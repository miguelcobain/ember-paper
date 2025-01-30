/* eslint-disable ember/classic-decorator-no-classic-methods, ember/no-classic-components, ember/no-computed-properties-in-native-classes, prettier/prettier */
import Component from '@ember/component';
import template from './template';

import { action, computed } from '@ember/object';
import { nextTick } from 'ember-css-transitions/utils/transition-utils';

import { tagName, layout } from '@ember-decorators/component';

import { ESCAPE, LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW } from 'ember-paper/utils/key-constants';

import { getOwner } from '@ember/application';
import ebdGetParent from 'ember-paper/utils/ebd-get-parent';

function waitForAnimations(element, callback) {
  let computedStyle = window.getComputedStyle(element);
  if (computedStyle.transitionDuration && computedStyle.transitionDuration !== '0s') {
    let eventCallback = function() {
      element.removeEventListener('transitionend', eventCallback);
      callback();
    };
    element.addEventListener('transitionend', eventCallback);
  } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
    let eventCallback = function() {
      element.removeEventListener('animationend', eventCallback);
      callback();
    };
    element.addEventListener('animationend', eventCallback);
  } else {
    callback();
  }
}

@tagName('')
@layout(template)
class PaperMenuContent extends Component {

  isActive = false;

  @computed('otherStyles', 'isActive')
  get customStyles() {
    if (this.isActive) {
      return {};
    } else {
      return this.otherStyles;
    }
  }

  @computed('destination')
  get destinationElement() {
    return document.getElementById(this.destination);
  }

  @action
  async animateIn() {
    await nextTick();
    this.set('isActive', true);
  }

  @action
  async animateOut(element) {
    let parentElement = this.renderInPlace ? element.parentElement.parentElement : element.parentElement;

    // workaround for https://github.com/adopted-ember-addons/ember-paper/issues/1151. See also https://github.com/emberjs/ember.js/issues/18795.
    // & https://github.com/adopted-ember-addons/ember-paper/issues/1166
    if (!parentElement) {
      parentElement = ebdGetParent(getOwner(this));
    }

    let clone = element.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    parentElement.appendChild(clone);

    await nextTick();

    if (!this.isDestroyed) {
      this.set('isActive', false);
      clone.classList.add('md-leave');
      waitForAnimations(clone, function() {
        clone.classList.remove('md-active');
        parentElement.removeChild(clone);
      });
    } else {
      parentElement.removeChild(clone);
    }
    this.returnFocus(element);
  }

  @action
  focusItem(element) {
    let focusTarget = element.querySelector('.md-menu-focus-target');

    // default to first non disabled item
    if (!focusTarget) {
      let menuItem = element.querySelector('md-menu-item:not([disabled])');
      focusTarget = menuItem && menuItem.firstElementChild;
    }

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  @action
  async returnFocus(element) {
    const ariaOwningElement = document.querySelector(`[aria-owns=${element.id}]`);
    if (ariaOwningElement) {
     ariaOwningElement.firstElementChild.focus();
    }
  }

  @action
  handleKeyDown(ev) {
    switch (ev.which) {
      case ESCAPE:
        this.dropdown.actions.close();
        break;
      case LEFT_ARROW:
      case UP_ARROW:
        ev.preventDefault();
        this.focusMenuItem(ev, -1);
        break;
      case RIGHT_ARROW:
      case DOWN_ARROW:
        ev.preventDefault();
        this.focusMenuItem(ev, 1);
        break;
    }
  }

  focusMenuItem(e, direction) {
    let focusTarget = e.target.closest('md-menu-item');

    do {
      if (direction > 0) {
        focusTarget = focusTarget.nextElementSibling;
      } else {
        focusTarget = focusTarget.previousElementSibling;
      }
    } while (focusTarget && !isFocusable(focusTarget));

    focusTarget = focusTarget && focusTarget.firstElementChild;

    if (focusTarget) {
      focusTarget.focus();
    }
  }
}

function isFocusable(el) {
  // is a menu-item, doesn't have tabindex -1 and is not disabled
  return el && el.tagName === 'MD-MENU-ITEM' && el.getAttribute('tabindex') !== -1 && el.getAttribute('disabled') === null;
}

export default PaperMenuContent;
