import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['paper-drawer','sidenav', 'sidenav-static','animatable'],
  classNameBindings:['open:visible'],
  open:Ember.computed.alias('parentView.drawerOpen')
});