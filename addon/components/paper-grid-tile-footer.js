/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-grid-tile-footer';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperGridTileFooter
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-grid-tile-footer'
});

PaperComponent[NAME_KEY] = 'paper-grid-tile-footer';

export default PaperComponent;
