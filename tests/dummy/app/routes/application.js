import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    raisedButton:function(){
      alert('You pressed a raised button.');
    },
    flatButton:function(){
      alert('You pressed a flat button.');
    },
    targetButton:function() {
      alert('You pressed a target button. -from route');
    },
    willTransition: function() {
      this.controller.set('drawerOpen',false);
    }
  }
});
