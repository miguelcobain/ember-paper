/**
 * @module ember-paper
 */
import PaperMenuContainerAbstract from './paper-menu-container-abstract';

/**
 * @class PaperMenuContainer
 * @extends PaperMenuContainerAbstract
 */
export default PaperMenuContainerAbstract.extend({
  classNames: ['md-whiteframe-z2','md-open-menu-container'],
  interaction: true
});
