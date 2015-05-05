import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import PaperMenuSelectable from './paper-menu-selectable';

export default Ember.Component.extend(RippleMixin, {
  //TODO change to `md-menu-item` after styles are added
  tagName: 'md-menu-item',
  classNames: ['paper-menu-item'],
  attributeBindings: ['selectedAttr:selected'],

  parentSelectable: Ember.computed(function() {
    var selectable = this.nearestOfType(PaperMenuSelectable);
    Ember.assert("paper-menu-item component used without an enclosing paper-selectable", !!selectable);
    return selectable;
  }),

  /*
   * Not binding boolean values in Ember 1.8.1?
   * https://github.com/emberjs/ember.js/issues/9595
   */
  selectedAttr: Ember.computed('selected', function() {
    return this.get('selected') ? 'selected' : null;
  }),
  selected: Ember.computed('value', 'parentSelectable.value', function() {
    return this.get('value') === this.get('parentSelectable.value');
  }),

  click: function() {
    this.sendAction('action', this.get('param'));
  }
});
