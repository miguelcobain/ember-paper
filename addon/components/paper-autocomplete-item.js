import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',


  label: Ember.computed('item',function () {
    return this.get('lookupLabel').call(this.get('target'), this.get('item'));
  }),

  isSelected: Ember.computed('selectedIndex', function () {
    return this.get('selectedIndex') === this.get('index');
  }),

  click () {
    this.sendAction('pick', this.get('item'));
  }
});
