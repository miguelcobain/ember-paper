import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames:['paper-backdrop','md-opaque','md-default-theme'],

  click: function(evt){
    Ember.$(evt.target).trigger('collapseSidenav');
    return false;
  }
});
