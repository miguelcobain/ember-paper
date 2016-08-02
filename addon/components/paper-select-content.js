import PaperMenuContent from './paper-menu-content';
import Ember from 'ember';

const { run, $ } = Ember;
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

export default PaperMenuContent.extend({
  animateIn() {
    run.next(() => {
      run.scheduleOnce('afterRender', this, () => {
        let dropdown = this.get('dropdown');
        dropdown.actions.reposition();
        this.set('isActive', true);
        this.dropdownElement.style.transform = '';
      });
    });
  },
  animateOut(dropdownElement) {
    let parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    let $clone = $(clone);
    parentElement.appendChild(clone);
    $(clone.children[0].children[0]).scrollTop($(dropdownElement.children[0].children[0]).scrollTop());
    window.requestAnimationFrame(() => {
      if (!this.get('isDestroyed')) {
        this.set('isActive', false);
        $clone.addClass('md-leave');
        waitForAnimations(clone, function() {
          $clone.removeClass('md-active');
          parentElement.removeChild(clone);
        });
      }
    });
  },
  addGlobalEvents() {
    window.addEventListener('scroll', this.runloopAwareReposition);
    window.addEventListener('resize', this.runloopAwareReposition);
    window.addEventListener('orientationchange', this.runloopAwareReposition);
    if (MutObserver) {
      this.mutationObserver = new MutObserver((mutations) => {
        // e-b-d incorrectly counts ripples as a mutation, triggering a problematic repositon
        let addedNodes = Array.from(mutations[0].addedNodes).filter((node) => !$(node).hasClass('md-ripple'));
        if (addedNodes.length || mutations[0].removedNodes.length) {
          this.runloopAwareReposition();
        }
      });
      this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
    } else {
      this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
      this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
    }
  }
});
