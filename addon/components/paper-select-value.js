/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperSelectValue
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-select-value',
  classNames: ['md-select-value'],
  classNameBindings: ['isPlaceholder:md-select-placeholder'],

  isPlaceholder: Ember.computed('value', function() {
    return !this.get('value');
  }),

  label: Ember.computed('isPlaceholder', function() {
    if (this.get('isPlaceholder')) {
      return this.get('placeholder');
    } else {
      return this.get('value');
    }
  })

});
