/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-header';

const { Component } = Ember;

/**
 * @class PaperCardHeader
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-header'
});
