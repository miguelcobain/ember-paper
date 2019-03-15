/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from 'ember-paper/components/paper-radio/base/component';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ProxiableMixin
 */
export default PaperRadioBaseComponent.extend(ProxiableMixin, {
  processProxy() {
    this.click();
  }
});
