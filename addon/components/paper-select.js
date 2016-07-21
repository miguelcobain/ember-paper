/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperInput from './paper-input';

const { computed } = Ember;

/**
 * @class PaperSelect
 * @extends PaperInput
 */
export default PaperInput.extend({
  label: computed.alias('placeholder')
});
