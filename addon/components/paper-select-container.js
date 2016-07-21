/**
 * @module ember-paper
 */
import PaperMenuContainerAbstract from './paper-menu-container-abstract';

/**
 * @class PaperSelectContainer
 * @extends PaperMenuContainerAbstract
 */
export default PaperMenuContainerAbstract.extend({
  classNames: ['md-select-menu-container'],
  interaction: true
});
