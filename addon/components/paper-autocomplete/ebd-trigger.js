/**
 * @module ember-paper
 */
import Component from '@glimmer/component';

/**
 * @class PaperSelectEbdTrigger
 * @extends Component
 */
export default class PaperSelectEbdTrigger extends Component {
  get shouldShowLabel() {
    return this.args.label && this.args.selected;
  }
}
