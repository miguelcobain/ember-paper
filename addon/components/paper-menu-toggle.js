import Ember from 'ember';
import PaperMenuSelectable from './paper-menu-selectable';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['paper-menu-toggle'],

  parentSelectable: Ember.computed(function() {
    var selectable = this.nearestOfType(PaperMenuSelectable);
    Ember.assert("paper-menu-toggle component used without an enclosing paper-selectable", !!selectable);
    return selectable;
  }),

  click: function() {
    var parentSelectable = this.get('parentSelectable');
    parentSelectable.send('toggleMenu');
  }
});
