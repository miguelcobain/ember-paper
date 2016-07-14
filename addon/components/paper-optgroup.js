/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperOptgroup
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-optgroup',
  attributeBindings: ['label']
});
