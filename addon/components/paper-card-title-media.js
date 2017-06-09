/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title-media';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardTitleMedia
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-card-title-media',
  size: 'md'
});

PaperComponent[NAME_KEY] = 'paper-card-title-media';

export default PaperComponent;
