import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin,{
  classNames:['paper-radio'],
  classNameBindings:['checked:paper-checked'],
  toggle:false,

  center: true,
  animationDuration: 300,
  mousedownPauseTime: 180,
  animationName: 'inkRippleCheckbox',
  animationTimingFunction: 'linear',

  rippleContainerSelector:'.paper-container',

  checked: function() {
    if (this.get('disabled')) {
      return false;
    }
    return this.get('value') === this.get('selected');
  }.property('value', 'selected'),

  checkedDidChange: Ember.observer('checked',function() {
    if(this.get('checked')){
      this.set('selected', this.get('value'));
    }
  }),

  click:function(){
    if (this.get('disabled')) {
      return false;
    }
    if(this.toggle){
      this.set('selected', this.get('checked')?null:this.get('value'));
    } else {
      this.set('selected', this.get('value'));
    }
  }
});
