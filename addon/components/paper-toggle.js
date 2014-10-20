import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  classNames:['paper-toggle'],
  classNameBindings:['checked'],
  toggle:true,
  checked:Ember.computed.alias('active')
});
