import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';

export default Ember.Component.extend({
  tagName:'md-item-content',
  classNames:['paper-item'],
  classNameBindings: ['active'],
  click: function() {
    this.sendAction('action', this.get('param'));
  },

  active: Ember.computed('param', 'activeParam', function() {
    return this.get('param') === this.get('activeParam');
  }),

  willInsertElement: function() {
    if (this.get('ripple')) {
      RippleMixin.apply(this);
    }
  }
});
