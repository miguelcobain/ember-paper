import Ember from 'ember';
import EventsMixin from '../mixins/events-mixin';

export default Ember.Component.extend(EventsMixin,{
  disabled:false,
  pressed:false,
  active:false,
  focus:false,
  hover:false,
  classNameBindings: ['disabled','pressed','active','focus','hover'],

  toggle:false,

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   */
  focusIn: function() {
    if (!this.get('pressed')){
      // Only render the "focused" state if the element gains focus due to
      // keyboard navigation.
      this.set('focus',true);
    }
  },
  focusOut: function(){
    this.set('focus',false);
  },
  mouseEnter:function(){
    this.set('hover',true);
  },
  mouseLeave:function(e){
    this.set('hover',false);
    this._super(e);
  },

  down:function(){
    if (this.disabled) {
      return true;
    }
    this.set('pressed',true);
    if (this.toggle) {
      this.toggleProperty('active');
    } else {
      this.set('active',true);
    }
  },
  contextMenu:function(){
    this.up();
    this.focusIn();
  },
  up:function(){
    this.set('pressed',false);

    if (!this.toggle && !this.disabled) {
      this.set('active',false);
    }
  }
});
