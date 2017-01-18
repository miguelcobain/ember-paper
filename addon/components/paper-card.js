/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card';

const { Component } = Ember;

/**
 * @class PaperCard
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card'
});
