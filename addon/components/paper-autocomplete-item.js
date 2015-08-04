import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',

  label: Ember.computed('item', function() {
    return this.lookupLabelOfItem(this.get('item'));
  }),

  isSelected: Ember.computed('selectedIndex', function() {
    return this.get('selectedIndex') === this.get('index');
  }),

  lookupLabelOfItem(model) {
    return this.get('lookupKey') ? Ember.get(model, this.get('lookupKey')) : model;
  },

  click() {
    this.sendAction('pick', this.get('item'));
  }
});
