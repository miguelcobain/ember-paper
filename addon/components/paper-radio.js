/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperRadioBaseComponent from './paper-radio-base';
import { ChildMixin } from 'ember-composability-tools';

const { NAME_KEY } = Ember;

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ChildMixin
 */
const PaperComponent = PaperRadioBaseComponent.extend(ChildMixin, {
  shouldRegister: false
});

PaperComponent[NAME_KEY] = 'paper-radio';

export default PaperComponent;
