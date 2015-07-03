import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  tagName: 'md-input-group',
  classNames: ['md-default-theme'],
  classNameBindings: ['hasValue:md-input-has-value', 'focus:md-input-focused', 'isInvalid:md-input-invalid'],
  type: 'text',
  hasValue: Ember.computed.notEmpty('value'),
  inputElementId: Ember.computed('elementId', function() {
    return 'input-' + this.get('elementId');
  }),
  isInvalid: Ember.computed('value', function() {
    if(this.get("required") && (!this.get("hasValue"))) {
      this.set('errorAttr', 'required');
      return true;
    }
    return false;
  }),
  actions: {
    focusIn() {
      this.set('focus',true);
    },
    focusOut() {
      this.set('focus',false);
    }
  }
});
