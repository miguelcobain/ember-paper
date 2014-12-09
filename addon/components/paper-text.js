import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  tagName:'md-input-group',
  classNames:['md-default-theme'],
  classNameBindings:['hasValue:md-input-has-value','focus:md-input-focused'],
  type:'text',
  hasValue: Ember.computed.notEmpty('value'),
  inputElementId: function(){
    return 'input-' + this.get('elementId');
  }.property('elementId'),
  actions:{
    focusIn:function(){
      this.set('focus',true);
    },
    focusOut:function(){
      this.set('focus',false);
    }
  }
});
