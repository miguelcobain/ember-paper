import Ember from 'ember';
import PaperInput from './paper-input';

let { computed } = Ember;

export default PaperInput.extend({
  label: computed.alias('placeholder'),
  value: computed.alias('model'),
  itemLabelCallback: computed.alias('item-label-callback'),
  onOpen: computed.alias('on-open')
});
