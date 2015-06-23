import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-item-content',
  classNames: ['paper-item'],
  click: function() {
    this.sendAction('action', this.get('param'));
  }
});
