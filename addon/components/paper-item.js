import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-item-content',
  classNames: ['paper-item'],
  click() {
    this.sendAction('action', this.get('param'));
  }
});
