import Ember from 'ember';
import PaperInput from './paper-input';

export default PaperInput.extend({
  label: Ember.computed.alias('placeholder'),
  value: Ember.computed.alias('model'),
  itemLabelCallback: Ember.computed.alias('item-label-callback'),
  onOpen: Ember.computed.alias('on-open')
});
