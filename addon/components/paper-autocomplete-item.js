import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',

  isSelected: Ember.computed('parent.index', function () {
    return this.get('parent').get('index') === this.get('index');
  }),

  click () {
    this.get('parent').set('model', this.get('item'));
  }
});
