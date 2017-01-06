/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-menu-content';
import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';
const { $, computed, String: { htmlSafe } } = Ember;
const MutObserver = window.MutationObserver || window.WebKitMutationObserver;

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

/**
 * @class PaperMenuContent
 * @extends ContentComponent
 */
export default ContentComponent.extend({
  layout,

  // We need to overwrite this CP because:
  //   1. we don't want to use the width property
  //   2. we need additional styles
  style: computed('top', 'left', 'right', 'transform', 'transformOrigin', function() {
    let style = '';
    let { top, left, right, transform, transformOrigin } = this.getProperties('top', 'left', 'right', 'transform', 'transformOrigin');
    if (top) {
      style += `top: ${top};`;
    }
    if (left) {
      style += `left: ${left};`;
    }
    if (right) {
      style += `right: ${right};`;
    }
    if (transform) {
      style += `transform: ${transform};`;
    }
    if (transformOrigin) {
      style += `transform-origin: ${transformOrigin};`;
    }
    if (style.length > 0) {
      return htmlSafe(style);
    }
  }),

  startObservingDomMutations() {
    if (MutObserver) {
      this.mutationObserver = new MutObserver((mutations) => {
        // e-b-d incorrectly counts ripples as a mutation, triggering a problematic repositon
        // convert NodeList to Array
        let addedNodes = Array.prototype.slice.call(mutations[0].addedNodes).filter((node) => !$(node).hasClass('md-ripple') && (node.nodeName !== '#comment') && !(node.nodeName === '#text' && node.nodeValue === ''));
        let removedNodes = Array.prototype.slice.call(mutations[0].removedNodes).filter((node) => !$(node).hasClass('md-ripple') && (node.nodeName !== '#comment'));

        if (addedNodes.length || removedNodes.length) {
          this.runloopAwareReposition();
        }
      });
      this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
    } else {
      this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
      this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
    }
  },

  animateIn() {
    this.dropdownElement.style.transform = this.get('transform');
    nextTick().then(() => {
      this.set('isActive', true);
      this.set('transform', null);
    });
  },

  animateOut(dropdownElement) {
    let parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    let $clone = $(clone);
    parentElement.appendChild(clone);
    nextTick().then(() => {
      if (!this.get('isDestroyed')) {
        this.set('isActive', false);
        $clone.addClass('md-leave');
        waitForAnimations(clone, function() {
          $clone.removeClass('md-active');
          parentElement.removeChild(clone);
        });
      } else {
        parentElement.removeChild(clone);
      }
    });
  }
});
