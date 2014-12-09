import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['paper-sidenav'],
  actions:{
    toggleDrawer:function(){
      this.toggleProperty('drawerOpen');
    },
    closeDrawer:function(){
      this.set('drawerOpen',false);
    }
  }
});
