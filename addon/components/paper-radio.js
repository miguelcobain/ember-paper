import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  classNames:['paper-radio'],
  classNameBindings:['checked'],
  toggle:false,

  checked: function() {
    return this.get('value') === this.get('selected');
  }.property('value', 'selected'),

  checkedDidChange: Ember.observer('checked',function() {
    if(this.get('checked')){
      this.set('selected', this.get('value'));
    }
  }),

  down:function(){
    this._super();
    if(this.toggle){
      this.set('selected', this.get('checked')?null:this.get('value'));
    } else {
      this.set('selected', this.get('value'));
    }
  }
});
