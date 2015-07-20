import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',


  label: Ember.computed('item',function () {
    return this.get('target').lookupLabelOfItem(this.get('item'));
  }),

  isSelected: Ember.computed('selectedIndex', function () {
    return this.get('selectedIndex') === this.get('index');
  }),

  click () {
    this.get('target').send('pickModel', this.get('item'));
  }
});
