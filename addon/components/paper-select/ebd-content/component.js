import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { computed, action } from '@ember/object';

import { next, scheduleOnce } from '@ember/runloop';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';

import { ESCAPE, LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, ENTER } from 'ember-paper/utils/key-constants';

import { advanceSelectableOption } from 'ember-power-select/utils/group-utils';

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
class PaperSelectEbdContent extends Component {

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
  animateIn(dropdownElement) {
    next(() => {
      scheduleOnce('afterRender', this, this.afterAnimateIn, dropdownElement);
    });
  }

  afterAnimateIn(dropdownElement) {
    this.dropdown.actions.reposition();
    this.set('isActive', true);
    this.focusItem(dropdownElement);
  }

  @action
  async animateOut(dropdownElement) {
    let parentElement = this.renderInPlace ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    parentElement.appendChild(clone);

    clone.children[0].children[0].scrollTop = dropdownElement.children[0].children[0].scrollTop;

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
  }

  @action
  focusItem(element) {
    let focusTarget = element.querySelector('md-option[aria-selected="true"]');

    // default to first not disabled option
    if (!focusTarget) {
      focusTarget = element.querySelector('md-option:not([aria-disabled="true"])');
    }

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  @action
  handleKeyDown(ev) {
    switch (ev.which) {
      case ESCAPE: {
        this.dropdown.actions.close();
        break;
      }
      case LEFT_ARROW:
      case UP_ARROW: {
        ev.preventDefault();
        let newHighlighted = advanceSelectableOption(this.select.results, this.select.highlighted, -1);
        this.select.actions.highlight(newHighlighted, ev);
        this.select.actions.scrollTo(newHighlighted);
        this.focusOption(ev, -1);
        break;
      }
      case RIGHT_ARROW:
      case DOWN_ARROW: {
        ev.preventDefault();
        let newHighlighted = advanceSelectableOption(this.select.results, this.select.highlighted, 1);
        this.select.actions.highlight(newHighlighted, ev);
        this.select.actions.scrollTo(newHighlighted);
        this.focusOption(ev, 1);
        break;
      }
      case ENTER: {
        ev.preventDefault();
        this.select.actions.choose(this.select.highlighted);
        break;
      }
    }
  }

  focusOption(e, direction) {
    let focusTarget = e.target.closest('md-option');

    do {
      if (direction > 0) {
        focusTarget = focusTarget.nextElementSibling;
      } else {
        focusTarget = focusTarget.previousElementSibling;
      }
    } while (focusTarget && !isFocusable(focusTarget));

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  shouldReposition(mutations) {
    let shouldReposition = false;

    shouldReposition = Array.prototype.slice.call(mutations[0].addedNodes).some((node) => {
      if (node.classList) {
        return !node.classList.contains('md-ripple') && (node.nodeName !== '#comment') && !(node.nodeName === '#text' && node.nodeValue === '');
      }
      return false;
    });

    shouldReposition = shouldReposition || Array.prototype.slice.call(mutations[0].removedNodes).some((node) => {
      if (node.classList) {
        return !node.classList.contains('md-ripple') && (node.nodeName !== '#comment') && !(node.nodeName === '#text' && node.nodeValue === '');
      }
      return false;
    });

    return shouldReposition;
  }

}

function isFocusable(el) {
  // is a menu-item, doesn't have tabindex -1 and is not disabled
  return el && el.tagName === 'MD-OPTION' && el.getAttribute('tabindex') !== -1 && el.getAttribute('disabled') === null && el.getAttribute('aria-disabled') !== true;
}

export default PaperSelectEbdContent;
