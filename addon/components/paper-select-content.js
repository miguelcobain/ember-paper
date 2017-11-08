/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperMenuContent from './paper-menu-content';
import layout from '../templates/components/paper-select-content';

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

/**
 * @class PaperSelectContent
 * @extends PaperMenuContent
 */
export default PaperMenuContent.extend({
  layout,

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
  }
});
