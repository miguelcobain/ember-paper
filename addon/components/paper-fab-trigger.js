import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-fab-trigger',

  mouseEnter() {
    this.sendAction('mouse-enter');
  }
});
