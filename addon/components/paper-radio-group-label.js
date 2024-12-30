import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class PaperRadioGroupLabel extends Component {
  /**
   * provides a globally unique component id for tracking bindings between aria
   * tags and labels.
   * @type {string}
   */
  labelId;

  constructor(owner, args) {
    super(owner, args);

    this.labelId = this.args.labelId || `${guidFor(this)}-label`;
  }

  /**
   * Performs any required DOM setup.
   * @param element
   */
  @action didInsertNode() {
    if (this.args.setAriaLabelledby) {
      this.args.setAriaLabelledby(this.labelId);
    }
  }
}
