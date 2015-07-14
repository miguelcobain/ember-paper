import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'paper-bottom-sheet',
  classNames: ['paper-bottom-sheet_wrapper'],
  classNameBindings: ['isOpen:is-open', 'style'],

  isOpen: false,
  style: 'list'
});
