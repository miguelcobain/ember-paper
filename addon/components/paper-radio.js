/* eslint-disable ember/no-mixins */
/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from './paper-radio-base';
import { ChildMixin } from 'ember-paper/mixins/ember-composability-tools';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ChildMixin
 */
export default class PaperRadio extends PaperRadioBaseComponent.extend(ChildMixin) {
 shouldRegister = false;
}
