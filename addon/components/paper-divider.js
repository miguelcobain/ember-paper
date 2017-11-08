/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, computed } = Ember;

/**
 * @class PaperDivider
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-divider',
  attributeBindings: ['insetAttr:md-inset'],
  inset: false,
  classNames: ['paper-divider', 'md-default-theme'],

  /*
   * Not binding boolean values in Ember 1.8.1?
   * https://github.com/emberjs/ember.js/issues/9595
   */
  insetAttr: computed('inset', function() {
    return this.get('inset') ? 'md-inset' : null;
  })
});
