/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, computed } = Ember;

/**
 * @class PaperSelectValue
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-select-value',
  classNames: ['md-select-value'],
  classNameBindings: ['isPlaceholder:md-select-placeholder'],

  isPlaceholder: computed('value', function() {
    return !this.get('value');
  }),

  label: computed('isPlaceholder', function() {
    if (this.get('isPlaceholder')) {
      return this.get('placeholder');
    } else {
      return this.get('value');
    }
  })

});
