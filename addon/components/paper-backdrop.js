import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['paper-backdrop','md-opaque','md-default-theme'],

  willDestroyElement: function() {
    var clone  = this.$().clone();
    this.$().parent().append(clone);
    clone.addClass('ng-leave');
    Ember.run.later((function() {
      clone.remove();
    }), 200);
  },

  click: function(evt) {
    Ember.$(evt.target).trigger('collapseSidenav');
    return false;
  }
});
