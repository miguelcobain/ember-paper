/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, computed, get } = Ember;

/**
 * @class PaperAutocompleteItem
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'li',
  attributeBindings: ['tabindex', 'role'],
  classNameBindings: ['isSelected:selected'],
  tabindex: 0,
  role: 'option',

  label: computed('item', function() {
    return this.lookupLabelOfItem(this.get('item'));
  }),

  isSelected: computed('selectedIndex', function() {
    return this.get('selectedIndex') === this.get('index');
  }),

  lookupLabelOfItem(model) {
    return this.get('lookupKey') ? get(model, this.get('lookupKey')) : model;
  },

  click() {
    this.sendAction('pick', this.get('item'));
  }
});
