/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-grid-tile-footer';

const { Component } = Ember;

/**
 * @class PaperGridTileFooter
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-grid-tile-footer'
});
