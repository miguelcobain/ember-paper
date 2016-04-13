import Ember from 'ember';
import PaperInput from './paper-input';

let { assert } = Ember;

export default PaperInput.extend({
  label: Ember.computed.alias('placeholder'),
  value: Ember.computed.alias('model'),
  itemLabelCallback: Ember.computed.alias('item-label-callback'),
  onOpen: Ember.computed.alias('on-open'),

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    assert('{{paper-select}} requires an `onChange` action', !!this.get('onChange'));
  }

});
