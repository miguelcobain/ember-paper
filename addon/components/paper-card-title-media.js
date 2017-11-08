/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title-media';

const { Component } = Ember;

/**
 * @class PaperCardTitleMedia
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-title-media',
  size: 'md'
});
