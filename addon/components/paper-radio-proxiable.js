/**
 * @module ember-paper
 */
import PaperRadio from './paper-radio';

/**
 * @class PaperRadio
 * @extends PaperRadioBase
 */
export default class PaperRadioProxiable extends PaperRadio {
  processProxy() {
    this.onClick();
  }
}
