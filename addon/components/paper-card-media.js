/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-media';

const { Component } = Ember;

/**
 * @class PaperCardMedia
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',
  size: 'md'
});
