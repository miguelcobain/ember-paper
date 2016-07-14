import Ember from 'ember';
import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
const { run, $ } = Ember;

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

export default ContentComponent.extend({
  animateIn() {
    run.next(() => {
      this.set('isActive', true);
      this.dropdownElement.style.transform = '';
    });
  },

  animateOut(dropdownElement) {
    let parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
    let clone = dropdownElement.cloneNode(true);
    clone.id = `${clone.id}--clone`;
    let $clone = $(clone);
    parentElement.appendChild(clone);
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
  actions: {
    didOpen() {
      let appRoot = this.get('appRoot');
      let dropdown = this.get('dropdown');
      this.dropdownElement = document.getElementById(this.dropdownId);
      let triggerId = this.get('triggerId');
      if (triggerId) {
        this.triggerElement = document.getElementById(this.triggerId);
      }
      appRoot.addEventListener('mousedown', this.handleRootMouseDown, true);
      if (this.get('isTouchDevice')) {
        appRoot.addEventListener('touchstart', this.touchStartHandler, true);
        appRoot.addEventListener('touchend', this.handleRootMouseDown, true);
      }

      let onFocusIn = this.get('onFocusIn');
      if (onFocusIn) {
        this.dropdownElement.addEventListener('focusin', (e) => onFocusIn(dropdown, e));
      }
      let onFocusOut = this.get('onFocusOut');
      if (onFocusOut) {
        this.dropdownElement.addEventListener('focusout', (e) => onFocusOut(dropdown, e));
      }

      if (!this.get('renderInPlace')) {
        this.addGlobalEvents();
      }
      dropdown.actions.reposition();
      if (this.get('animationEnabled')) {
        run.scheduleOnce('afterRender', this, this.animateIn);
      }
    }
  }
});
