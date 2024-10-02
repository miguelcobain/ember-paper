/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import { nextTick } from 'ember-css-transitions/modifiers/css-transition';
import calculateTooltipPosition from 'ember-paper/utils/calculate-tooltip-position';

export default Component.extend({
  tagName: '',

  positionClass: computed('position', function () {
    return `md-origin-${this.position}`;
  }),

  setupTooltip(element, [position, anchorElement]) {
    schedule('afterRender', () => {
      let pos = calculateTooltipPosition(element, anchorElement, position);
      element.style.top = `${pos.top}px`;
      element.style.left = `${pos.left}px`;
      element.classList.add('md-show-add');
      nextTick()
        .then(nextTick)
        .then(nextTick)
        .then(nextTick)
        .then(() => {
          element.classList.add('md-show');
        });
    });
  },
});
