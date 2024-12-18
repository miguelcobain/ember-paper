/**
 * @module ember-paper
 */
import PaperRadio from './paper-radio';

/**
 * @class PaperRadio
 * @extends PaperRadioBase
 */
export default class PaperRadioProxiable extends PaperRadio {
  constructor(owner, args) {
    super(owner, args);

    this.shouldRegister = this.args.shouldRegister ?? false;
  }

  processProxy() {
    this.onClick();
  }
}
