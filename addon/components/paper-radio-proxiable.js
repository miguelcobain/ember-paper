/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperRadioBaseComponent from './paper-radio-base';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';

const { NAME_KEY } = Ember;

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ProxiableMixin
 */
const PaperComponent = PaperRadioBaseComponent.extend(ProxiableMixin, {
  processProxy() {
    this.click();
  }
});

PaperComponent[NAME_KEY] = 'paper-radio-proxiable';

export default PaperComponent;
