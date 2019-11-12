import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

function getElementIndex(node) {
  let index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }

  return index;
}

export default Component.extend({
  classNames: ['md-fab-action-item'],
  attributeBindings: ['style'],

  style: computed('elementDidRender', 'speedDial.{animation,open,direction}', function() {
    if (!this.get('elementDidRender')) {
      return;
    }

    let animation = this.get('speedDial.animation');
    let open = this.get('speedDial.open');
    if (animation === 'fling') {
      if (!open) {
        return this.flingClosed();
      }
    } else if (animation === 'scale') {
      return this.scaleClosed();
    }
  }),

  didRender() {
    this._super(...arguments);
    this.set('elementDidRender', true);
  },

  scaleClosed() {
    let items = this.get('speedDial.element').querySelectorAll('.md-fab-action-item');
    let open = this.get('speedDial.open');
    let index = getElementIndex(this.element);
    let delay = 65;
    let offsetDelay = index * delay;
    let startZIndex = 0;

    let opacity = open ? 1 : 0;
    let transform = open ? 'scale(1)' : 'scale(0)';
    let transitionDelay = `${open ? offsetDelay : (items.length * delay) - offsetDelay}ms`;

    // Make the items closest to the trigger have the highest z-index
    let zIndex = (items.length - index) + startZIndex;

    return htmlSafe(`opacity: ${opacity}; transform: ${transform}; transition-delay: ${transitionDelay}; z-index: ${zIndex};`);
  },

  flingClosed() {
    let triggerElement = this.get('speedDial.element').querySelector('md-fab-trigger');
    let direction = this.get('speedDial.direction');
    let index = getElementIndex(this.element);

    // Make sure to account for differences in the dimensions of the trigger verses the items
    // so that we can properly center everything; this helps hide the el's shadows behind
    // the trigger.
    let triggerItemHeightOffset = (triggerElement.clientHeight - this.element.clientHeight) / 2;
    let triggerItemWidthOffset = (triggerElement.clientWidth - this.element.clientWidth) / 2;

    let newPosition, axis;

    switch (direction) {
      case 'up':
        newPosition = (this.element.scrollHeight * (index + 1) + triggerItemHeightOffset);
        axis = 'Y';
        break;
      case 'down':
        newPosition = -(this.element.scrollHeight * (index + 1) + triggerItemHeightOffset);
        axis = 'Y';
        break;
      case 'left':
        newPosition = (this.element.scrollWidth * (index + 1) + triggerItemWidthOffset);
        axis = 'X';
        break;
      case 'right':
        newPosition = -(this.element.scrollWidth * (index + 1) + triggerItemWidthOffset);
        axis = 'X';
        break;
    }

    return htmlSafe(`transform: translate${axis}(${newPosition}px)`);
  }
});