/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from 'ember-paper/components/paper-radio/base/component';
import { ChildMixin } from 'ember-composability-tools';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ChildMixin
 */
export default PaperRadioBaseComponent.extend(ChildMixin, {
  shouldRegister: false
});
