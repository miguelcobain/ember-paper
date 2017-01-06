/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-optgroup';

const { Component } = Ember;

/**
 * @class PaperOptgroup
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-optgroup',
  attributeBindings: ['label']
});
