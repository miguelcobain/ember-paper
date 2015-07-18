import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',

  label: Ember.computed('item',function () {
    return this.get('parent')._getModelSearchText(this.get('item'));
  }),

  isSelected: Ember.computed('parent.index', function () {
    return this.get('parent').get('index') === this.get('index');
  }),

  click () {
    this.get('parent').send('pickModel', this.get('item'));
  }
});
