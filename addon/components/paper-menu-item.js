import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';

export default Ember.Component.extend(RippleMixin, {
  //TODO change to `md-menu-item` after styles are added
  tagName: 'md-menu-item',
  classNames: ['paper-menu-item'],
  click: function() {
    this.sendAction('action', this.get('param'));
  }
});
