import Ember from 'ember';
import EventsMixin from '../mixins/events-mixin';

export default Ember.Component.extend(EventsMixin,{
  disabled:false,
  pressed:false,
  active:false,
  focused:false,
  attributeBindings: ['disabled','pressed','active','focused'],

  toggle:false,

  focusIn: function() {
    if (!this.get('pressed')){
      // Only render the "focused" state if the element gains focus due to
      // keyboard navigation.
      this.set('focused',true);
    }
  },
  focusOut: function(){
    this.set('focused',false);
  },
  
  down:function(){
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

    if (!this.toggle) {
      this.set('active',false);
    }
  }
});
