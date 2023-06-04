import Component from '@glimmer/component';
import { schedule } from '@ember/runloop';
import { nextTick } from 'ember-css-transitions/utils/transition-utils';
import calculateTooltipPosition from 'ember-paper/utils/calculate-tooltip-position';

export default class PaperTooltipInnerComponent extends Component {
  get positionClass() {
    return `md-origin-${this.args.position}`;
  }

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
  }
}
