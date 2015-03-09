import Ember from 'ember';

export default Ember.Component.extend({
  //TODO change to `md-menu-item` after styles are added
  tagName: 'li',
  classNames: ['paper-menu-item'],
  click: function() {
    this.sendAction('action', this.get('param'));
  }
});
