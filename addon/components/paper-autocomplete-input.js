import Ember from 'ember';
import PaperInput from './paper-input';

export default PaperInput.extend({

  attributeBindings: ['flex'],
  flex: true,


  inputElementId: Ember.computed('elementId', function() {
    return 'fl-input-' + this.get('elementId');
  }),


  actions: {
    focusIn() {
      this.set('focus',true);
      this.get('parent').send('inputFocusIn');
    },
    focusOut() {
      this.set('focus',false);
      this.get('parent').send('inputFocusOut');
    },
    inputKeyDown (value, event) {
      this.get('parent').send('inputKeyDown', value, event);
    }
  }
});
