import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { nextTick } from 'ember-css-transitions/utils/transition-utils';
import { advanceSelectableOption } from 'ember-power-select/utils/group-utils';
import ebdGetParent from 'ember-paper/utils/ebd-get-parent';
import {
  ESCAPE,
  LEFT_ARROW,
  UP_ARROW,
  RIGHT_ARROW,
  DOWN_ARROW,
  ENTER,
} from 'ember-paper/utils/key-constants';

function waitForAnimations(element, callback) {
  let computedStyle = window.getComputedStyle(element);
  if (
    computedStyle.transitionDuration &&
    computedStyle.transitionDuration !== '0s'
  ) {
    let eventCallback = function () {
      element.removeEventListener('transitionend', eventCallback);
      callback();
    };
    element.addEventListener('transitionend', eventCallback);
  } else if (
    computedStyle.animationName !== 'none' &&
    computedStyle.animationPlayState === 'running'
  ) {
    let eventCallback = function () {
      element.removeEventListener('animationend', eventCallback);
      callback();
    };
    element.addEventListener('animationend', eventCallback);
  } else {
    callback();
  }
}

export default class PaperSelectEbdContent extends Component {
  @tracked isActive = false;

  get customStyles() {
    if (this.isActive) {
      return {};
    } else {
      return this.args.otherStyles;
    }
  }

  get destinationElement() {
    return document.getElementById(this.args.destination);
  }

  @action async animateIn(dropdownElement) {
    await nextTick();
    this.afterAnimateIn(dropdownElement);
  }

  @action afterAnimateIn(dropdownElement) {
    this.args.dropdown.actions.reposition();
    this.isActive = true;
    this.focusItem(dropdownElement);
  }

  @action async animateOut(dropdownElement) {
    let parentElement = this.args.renderInPlace
      ? dropdownElement.parentElement.parentElement
      : dropdownElement.parentElement;

    // workaround for https://github.com/adopted-ember-addons/ember-paper/issues/1166
    if (!parentElement) {
      parentElement = ebdGetParent(getOwner(this));
    }

    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    parentElement.appendChild(clone);

    clone.children[0].children[0].scrollTop =
      dropdownElement.children[0].children[0].scrollTop;

    await nextTick();

    if (!this.isDestroyed) {
      this.isActive = false;
      clone.classList.add('md-leave');
      waitForAnimations(clone, function () {
        clone.classList.remove('md-active');
        parentElement.removeChild(clone);
      });
    } else {
      parentElement.removeChild(clone);
    }
  }

  @action focusItem(element) {
    let focusTarget = element.querySelector('md-option[aria-selected="true"]');

    // default to first not disabled option
    if (!focusTarget) {
      focusTarget = element.querySelector(
        'md-option:not([aria-disabled="true"])'
      );
    }

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  @action handleKeyDown(ev) {
    switch (ev.which) {
      case ESCAPE: {
        this.args.dropdown.actions.close();
        break;
      }
      case LEFT_ARROW:
      case UP_ARROW: {
        ev.preventDefault();
        let newHighlighted = advanceSelectableOption(
          this.args.select.results,
          this.args.select.highlighted,
          -1
        );
        this.args.select.actions.highlight(newHighlighted, ev);
        this.args.select.actions.scrollTo(newHighlighted);
        this.focusOption(ev, -1);
        break;
      }
      case RIGHT_ARROW:
      case DOWN_ARROW: {
        ev.preventDefault();
        let newHighlighted = advanceSelectableOption(
          this.args.select.results,
          this.args.select.highlighted,
          1
        );
        this.args.select.actions.highlight(newHighlighted, ev);
        this.args.select.actions.scrollTo(newHighlighted);
        this.focusOption(ev, 1);
        break;
      }
      case ENTER: {
        ev.preventDefault();
        this.args.select.actions.choose(this.args.select.highlighted);
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

    shouldReposition = Array.prototype.slice
      .call(mutations[0].addedNodes)
      .some((node) => {
        if (node.classList) {
          return (
            !node.classList.contains('md-ripple') &&
            node.nodeName !== '#comment' &&
            !(node.nodeName === '#text' && node.nodeValue === '')
          );
        }
        return false;
      });

    shouldReposition =
      shouldReposition ||
      Array.prototype.slice.call(mutations[0].removedNodes).some((node) => {
        if (node.classList) {
          return (
            !node.classList.contains('md-ripple') &&
            node.nodeName !== '#comment' &&
            !(node.nodeName === '#text' && node.nodeValue === '')
          );
        }
        return false;
      });

    return shouldReposition;
  }
}

function isFocusable(el) {
  // is a menu-item, doesn't have tabindex -1 and is not disabled
  return (
    el &&
    el.tagName === 'MD-OPTION' &&
    el.getAttribute('tabindex') !== -1 &&
    el.getAttribute('disabled') === null &&
    el.getAttribute('aria-disabled') !== true
  );
}
