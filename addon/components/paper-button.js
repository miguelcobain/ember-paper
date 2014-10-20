import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  classNames:['paper-button'],
  raised:false,
  recenteringTouch: false,
  fill: true,

  z:1,
  defaultZ:1,
  activeZ:2,
  disabledZ:0,
  animatedShadow:true,

  down:function(e){
    this._super();
    this.set('lastDownEvent',e);
  },
  up:function(e){
    this._super();
    this.set('lastUpEvent',e);
  },

  stateDidChange:Ember.observer('active','disabled',function(){
    var active = this.get('active'),
      disabled = this.get('disabled');
    if (active) {
      this.sendAction('action', this.get('param'));
      this.set('z',this.get('activeZ'));
    } else if (disabled) {
      this.set('z',this.get('disabledZ'));
    } else {
      this.set('z',this.get('defaultZ'));
    }
  })
});
