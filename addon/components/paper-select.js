import Ember from 'ember';
import PaperInput from './paper-input';

let { computed } = Ember;

export default PaperInput.extend({
  label: computed.alias('placeholder')
});
